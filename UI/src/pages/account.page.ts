import { expect, Page } from "@playwright/test";
import { BasePage } from "../utils/BasePage";

export class AccountPage extends BasePage {

    constructor(page: Page) {
        super(page)
    }

    private readonly accountCreatedTitle = this.page.getByRole("heading", {
        name: "Your Account Has Been Created!",
    });
    private readonly accountCreatedMessage = this.page.getByText(
        "Congratulations! Your new account has been successfully created!"
    );
    private readonly continueButton = this.page.getByRole("link", {
        name: "Continue",
    });

    async assertAccountCreated(): Promise<void> {
        await expect(this.accountCreatedTitle).toBeVisible();
        await expect(this.accountCreatedMessage).toBeVisible();
    }

    async clickContinue(): Promise<void> {
        await this.continueButton.click();
    }
}