import { Page } from "@playwright/test";
import { BasePage } from "../utils/BasePage";

export class LoginPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    private readonly emailInput = this.page.locator("#input-email");
    private readonly passwordInput = this.page.locator("#input-password");
    private readonly loginButton = this.page.locator(
        'input[type="submit"][value="Login"]'
    );

    async fillEmail(email: string): Promise<void> {
        await this.emailInput.fill(email);
    }

    async fillPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    async clickLogin(): Promise<void> {
        await this.loginButton.click();
    }

    async login(email: string, password: string): Promise<void> {
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.clickLogin();
    }
}