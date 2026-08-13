import { expect, Page } from "@playwright/test";
import { BasePage } from "../utils/BasePage";
import { retryWithBackoff } from "../utils/Utils";

export class OrderPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    private readonly content = this.page.locator("#content");
    // Page
    private readonly pageTitle = this.content.getByRole("heading", {
        name: "Confirm Order",
    });
    // Order products
    private readonly orderTable = this.content.locator(
        ".table-responsive table"
    );
    private readonly orderPlacedTitle = this.page.getByRole("heading", {
        name: "Your order has been placed!",
    });
    private readonly orderItems = this.orderTable.locator("tbody tr");
    // Order totals
    private readonly orderTotals = this.orderTable.locator("tfoot");
    // Addresses
    private readonly paymentAddress = this.content
        .getByRole("heading", { name: "Payment Address" })
        .locator("..")
        .locator(".card-body");
    private readonly shippingAddress = this.content
        .getByRole("heading", { name: "Shipping Address" })
        .locator("..")
        .locator(".card-body");
    // Shipping method
    private readonly shippingMethod = this.content
        .getByRole("heading", { name: "Shipping Method:" })
        .locator("..")
        .locator(".card-body");
    // Buttons
    private readonly editButton = this.content.getByRole("link", {
        name: "Edit",
    });
    private readonly confirmOrderButton = this.content.getByRole("button", {
        name: "Confirm Order",
    });


    async assertIsOnOrderPage(): Promise<void> {
        await this.pageTitle.waitFor({ state: "visible" });
        await this.pageTitle.isVisible()
        await expect(this.pageTitle).toHaveText("Confirm Order")
    }


    private getOrderItem(productName: string) {
        return this.orderItems.filter({
            hasText: productName,
        });
    }



    async getQuantity(productName: string): Promise<string> {
        const td = this.getOrderItem(productName).locator("td").nth(2);
        await td.waitFor({ state: "visible" });
        return await td.innerText();
    }


    async getUnitPrice(productName: string): Promise<string> {
        const td = this.getOrderItem(productName).locator("td").nth(3);
        await td.waitFor({ state: "visible" });
        return await td.innerText();
    }


    async getProductTotal(productName: string): Promise<string> {
        const td = this.getOrderItem(productName).locator("td").nth(4);
        await td.waitFor({ state: "visible" });
        return await td.innerText();
    }


    private getOrderTotalRow(label: string) {
        return this.orderTotals.locator("tr").filter({
            hasText: label,
        });
    }


    async getOrderTotal(label: string): Promise<string> {
        await this.orderTotals.waitFor({ state: "visible" });
        const td = this.getOrderTotalRow(label).locator("td").last();
        await td.waitFor({ state: "visible" });
        return await td.innerText();
    }


    async getPaymentAddress(): Promise<string> {
        return await this.paymentAddress.innerText();
    }


    async getShippingAddress(): Promise<string> {
        return await this.shippingAddress.innerText();
    }


    async getShippingMethod(): Promise<string> {
        return await this.shippingMethod.innerText();
    }


    async clickEdit(): Promise<void> {
        await this.editButton.click();
    }


    async confirmOrder(): Promise<void> {
        await this.page.waitForLoadState("load");
        await expect(this.confirmOrderButton).toBeEnabled()
        await retryWithBackoff(async () => {
            await this.confirmOrderButton.waitFor({ state: "visible" });
            await this.confirmOrderButton.click({ force: true });
        }, 3, 500, 2);
    }

    async assertOrderPlaced(): Promise<void> {
        await this.orderPlacedTitle.isVisible()
        await expect(this.orderPlacedTitle).toBeVisible();
    }
}