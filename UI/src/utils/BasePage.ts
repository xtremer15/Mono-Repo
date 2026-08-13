import { expect, Locator, Page } from "@playwright/test";
import { winLogger } from "./logger";

export abstract class BasePage {
  protected readonly page!: Page;
  readonly url!: string;

  constructor(page: Page) {
    this.page = this.createInterceptedPage(page);
  }

  async goTo(url: string): Promise<void> {
    await this.page.goto(url);
  }
  async waitForUrl(url: string): Promise<void> {
    expect(await this.page.url()).toBe(url);
  }


  async waitForElementVisibility(selector: string | Locator): Promise<void> {
    if (typeof selector === 'string') {
      await this.page.waitForSelector(selector, { state: 'visible' });
      const isVisible = await this.page.locator(selector).isVisible();
      expect(isVisible).toBeTruthy();
    } else {
      await selector.waitFor({ state: 'visible' });
      const isVisible = await selector.isVisible();
      expect(isVisible).toBeTruthy();
    }
  }



  async checkErrorMessage(locator: string | Locator, erorMessage: string) {
    await this.waitForElementVisibility(locator);
    const errorMsg = typeof locator === 'string'
      ? await this.page.locator(locator).innerText()
      : await locator.innerText();
    expect(errorMsg).toBe(erorMessage);
  }



  private get isLoggingEnabled(): boolean {
    return true; // process.env.LOG_LOCATORS === 'true';
  }

  private isLocator(obj: any): obj is Locator {
    return !!obj && typeof obj === 'object' && typeof obj['locator'] === 'function';
  }

  private createInterceptedLocator(locator: Locator, selector: string): Locator {
    const self = this;

    return new Proxy(locator, {
      get(target, prop, receiver) {
        const orig = Reflect.get(target, prop, receiver);

        if (typeof orig === 'function') {
          return (...args: any[]) => {
            // if (self.isLoggingEnabled) {
            //   winLogger.info(`[Locator.${String(prop)}] on '${selector}' with: ${JSON.stringify(args)}` );
            // }

            try {
              const result = orig.apply(target, args);

              // Handle async results
              if (result instanceof Promise) {
                return result.then(
                  res => {
                    if (self.isLoggingEnabled) {
                      winLogger.success(`[Locator.${String(prop)}] success on '${selector}'`);
                    }
                    return res;
                  },
                  err => {
                    if (self.isLoggingEnabled) {
                      winLogger.error(`[Locator.${String(prop)}] failed on '${selector}' ${JSON.stringify(err)}`,);
                    }
                    throw err;
                  }
                );
              }

              // Re-wrap chained locators
              if (self.isLocator(result)) {
                const chainedSelector =
                  `${selector}.${String(prop)}(${args.map(a => JSON.stringify(a)).join(", ")})`;
                return self.createInterceptedLocator(result, chainedSelector);
              }

              return result;
            } catch (e) {
              if (self.isLoggingEnabled) {
                winLogger.error(`[Locator.${String(prop)}] failed on '${selector}' ${JSON.stringify(e)}`,);
              }
              throw e;
            }
          };
        }

        return orig;
      },
    });
  }

  private createInterceptedPage(page: Page): Page {
    const self = this;

    return new Proxy(page, {
      get(target, prop, receiver) {
        const orig = Reflect.get(target, prop, receiver);

        // Intercept locator-producing methods
        const locatorFactories: (keyof Page)[] = [
          'locator',
          'getByRole',
          'getByText',
          'getByLabel',
          'getByPlaceholder',
          'getByAltText',
          'getByTitle',
          'getByTestId',
        ];

        if (locatorFactories.includes(prop as keyof Page)) {
          return (...args: any[]): Locator => {
            if (self.isLoggingEnabled) {
              winLogger.info(`[Intercepted] page.${String(prop)}() called with: ${JSON.stringify(args)}`,);
            }

            const locator = (orig as Function).apply(target, args);
            const selector = `${String(prop)}(${args.map(a => JSON.stringify(a)).join(", ")})`;

            return self.createInterceptedLocator(locator, selector);
          };
        }

        return orig;
      },
    });
  }

}