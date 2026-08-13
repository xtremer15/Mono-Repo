import { Page, Route } from '@playwright/test';

export class BaseService {
    constructor(protected page: Page) {}

    /**
     * Placeholder for future API login / user creation.
     * Can be used to replace UI registration.
     */
    async apiLogin(credentials: any): Promise<void> {
        // To be implemented: Send API request to create user/session
        // and inject auth cookies/tokens into the browser context.
        throw new Error('apiLogin is not yet implemented');
    }

    /**
     * Intercepts a UI request and mocks its response.
     */
    async mockRequest(urlPattern: string | RegExp, responsePayload: any, status: number = 200): Promise<void> {
        await this.page.route(urlPattern, async (route: Route) => {
            await route.fulfill({
                status,
                contentType: 'application/json',
                body: JSON.stringify(responsePayload),
            });
        });
    }

    /**
     * Intercepts and aborts a specific request.
     */
    async abortRequest(urlPattern: string | RegExp): Promise<void> {
        await this.page.route(urlPattern, (route: Route) => route.abort());
    }

    async waitForRouteResponse(routeStr: string, status: number = 200): Promise<void> {
        await this.page.waitForResponse(response => 
            response.url().includes(routeStr) && response.status() === status,
            { timeout: 30000 }
        );
    }
}
