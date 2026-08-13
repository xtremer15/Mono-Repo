import { expect, Page } from "@playwright/test";
import { BasePage } from "../utils/BasePage";

export class CartPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    private readonly content = this.page.locator("#content");
    private readonly cartItems = this.content.locator(
        "table.table-bordered tbody tr"
    );
    private readonly accordion = this.content.locator("#accordion");
    private readonly couponSection = this.accordion.locator(
        "#collapse-coupon"
    );
    private readonly couponInput = this.couponSection.locator(
        "#input-coupon"
    );
    private readonly applyCouponButton = this.couponSection.getByRole(
        "button",
        { name: "Apply Coupon" }
    );
    private readonly shippingSection = this.accordion.locator(
        "#collapse-shipping"
    );
    private readonly voucherSection = this.accordion.locator(
        "#collapse-voucher"
    );
    private readonly cartTotals = this.content.locator(
        "table.table-bordered.m-0"
    );
    private readonly checkoutButton = this.content.getByRole("link", {
        name: "Checkout",
        exact: true,
    });
    private readonly errorAlert = this.page.locator(
        ".alert.alert-danger"
    );
    private readonly countrySelect = this.shippingSection.locator(
        "#input-country"
    );
    private readonly regionSelect = this.shippingSection.locator(
        "#input-zone"
    );
    private readonly postCodeInput = this.shippingSection.locator(
        "#input-postcode"
    );
    private readonly getQuotesButton = this.shippingSection.getByRole(
        "button",
        { name: "Get Quotes" }
    );
    private readonly voucherInput = this.voucherSection.locator(
        "#input-voucher"
    );
    private readonly applyVoucherButton = this.voucherSection.locator(
        "#button-voucher"
    );
    async clickCheckout(): Promise<void> {
        await this.checkoutButton.click();
    }


    private getCartItem(productName: string) {
        return this.cartItems.filter({
            has: this.page.getByRole("link", {
                name: productName,
                exact: true,
            }),
        });
    }

    private getQuantityInput(productName: string) {
        return this.getCartItem(productName).locator(
            'input[name^="quantity["]'
        );
    }

    private getUpdateButton(productName: string) {
        return this.getCartItem(productName).getByTitle("Update");
    }

    private getRemoveButton(productName: string) {
        return this.getCartItem(productName).getByTitle("Remove");
    }

    private getUnitPriceLocator(productName: string) {
        return this.getCartItem(productName).locator("td").nth(4);
    }

    private getTotalPriceLocator(productName: string) {
        return this.getCartItem(productName).locator("td").nth(5);
    }

    private getCartTotalRow(label: string) {
        return this.cartTotals.locator("tr").filter({
            hasText: label,
        });
    }


    // Quantity

    async getQuantity(productName: string): Promise<string> {
        return await this.getQuantityInput(productName).inputValue();
    }

    async setQuantity(
        productName: string,
        quantity: string
    ): Promise<void> {
        await this.getQuantityInput(productName).fill(quantity);
    }

    async updateQuantity(productName: string): Promise<void> {
        await this.getUpdateButton(productName).click();
    }

    async removeProduct(productName: string): Promise<void> {
        await this.getRemoveButton(productName).click();
    }


    // Prices

    async getUnitPrice(productName: string): Promise<string> {
        return await this.getUnitPriceLocator(productName).innerText();
    }

    async getTotalPrice(productName: string): Promise<string> {
        return await this.getTotalPriceLocator(productName).innerText();
    }

    async calculateProductTotal(productName: string): Promise<number> {
        const unitPrice = await this.getUnitPrice(productName);
        const quantity = await this.getQuantity(productName);

        const price = parseFloat(
            unitPrice.replace(/[$€,]/g, "")
        );

        return price * Number(quantity);
    }


    // Cart totals

    async getCartTotal(label: string): Promise<string> {
        return await this.getCartTotalRow(label)
            .locator("td")
            .nth(1)
            .innerText();
    }


    // Errors

    async assertErrorMessage(message: string): Promise<void> {
        await expect(this.errorAlert).toContainText(message);
    }

    async applyCoupon(coupon: string): Promise<void> {
        await this.couponInput.fill(coupon);
        await this.applyCouponButton.click();
    }

    async selectCountry(country: string): Promise<void> {
        await this.countrySelect.selectOption({
            label: country,
        });
    }

    async selectRegion(region: string): Promise<void> {
        await this.regionSelect.selectOption({
            label: region,
        });
    }

    async fillPostCode(postCode: string): Promise<void> {
        await this.postCodeInput.fill(postCode);
    }

    async getShippingQuotes(): Promise<void> {
        await this.getQuotesButton.click();
    }

    async applyGiftCertificate(code: string): Promise<void> {
        await this.voucherInput.fill(code);
        await this.applyVoucherButton.click();
    }
}