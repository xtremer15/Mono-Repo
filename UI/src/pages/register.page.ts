import { expect, Page } from "@playwright/test";
import { BasePage } from "../utils/BasePage";
import { RegisterErrors } from "../errors-handler/ui-errors";

export class RegisterPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    private readonly content = this.page.locator("#content");
    private readonly pageTitle = this.content.getByRole("heading", {
        name: "Register Account",
    });
    private readonly firstNameInput = this.content.getByLabel("First Name");
    private readonly lastNameInput = this.content.getByLabel("Last Name");
    private readonly emailInput = this.content.getByLabel("E-Mail");
    private readonly telephoneInput = this.content.getByLabel("Telephone");
    private readonly passwordInput = this.content.getByLabel("Password");
    private readonly passwordConfirmInput = this.content.getByLabel(
        "Password Confirm"
    );
    private readonly newsletterYesRadio = this.content.getByLabel("Yes");
    private readonly newsletterNoRadio = this.content.getByLabel("No");
    private readonly privacyPolicyCheckbox = this.content.locator(
        "#input-agree"
    );
    private readonly privacyPolicyLink = this.content.getByRole("link", {
        name: "Privacy Policy",
    });
    private readonly continueButton = this.content.locator(
        'input[type="submit"][value="Continue"]'
    );
    private readonly alertContainer = this.page.locator("#alert");
    private readonly errorAlert = this.alertContainer.locator(
        ".alert.alert-danger"
    );

    async fillPersonalDetailsAndSubmit(
        firstName: string,
        lastName: string,
        email: string,
        password: string
    ): Promise<void> {
        await this.submitWithRetry(
            firstName,
            lastName,
            email,
            password,
            3
        );
    }

    private async submitWithRetry(
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        maxRetries: number
    ): Promise<void> {
        let currentEmail = email;

        for (let i = 0; i < maxRetries; i++) {
            await this.fillFormAndSubmit(
                firstName,
                lastName,
                currentEmail,
                password
            );

            const errorText = await this.checkErrorAlert();

            if (
                errorText &&
                errorText.includes(RegisterErrors.EMAIL_ALREADY_USED)
            ) {
                const [localPart, domain] = currentEmail.split("@");

                currentEmail = `${localPart}+retry${i + 1}@${domain}`;

                continue;
            }

            break;
        }
    }

    private async fillFormAndSubmit(
        firstName: string,
        lastName: string,
        email: string,
        password: string
    ): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.passwordInput.first().fill(password);
        await this.passwordConfirmInput.first().fill(password)
        await this.telephoneInput.fill("12345678")

        await this.privacyPolicyCheckbox.check({ force: true });

        await this.continueButton.click();
    }

    private async checkErrorAlert(): Promise<string | null> {
        try {
            await this.errorAlert.waitFor({
                state: "visible",
                timeout: 3000,
            });

            return await this.errorAlert.innerText();
        } catch {
            return null;
        }
    }

    async assertIsOnRegisterPage(): Promise<void> {
        await expect(this.pageTitle).toBeVisible();
        await expect(this.pageTitle).toHaveText("Register Account");
    }
}