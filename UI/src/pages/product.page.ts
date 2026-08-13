import { Page, expect } from "@playwright/test";
import { BasePage } from "../utils/BasePage";

export class ProductPage extends BasePage {
    // Product Details
    private readonly productInfo = this.page.locator("#entry_216815");
    private readonly productTitle = this.page.getByRole("heading", { level: 1 });
    private readonly productBreadcrumb = this.page.locator(".breadcrumb-item").last();
    private readonly availability = this.productInfo.locator(".content-extra li", { hasText: "Availability:" });
    private readonly price = this.productInfo.locator('[data-update="price"]');

    // Cart Actions
    private readonly quantityInput = this.productInfo.locator('input[name="quantity"]');
    private readonly decreaseQuantityButton = this.productInfo.getByRole("button", { name: "Decrease quantity" });
    private readonly increaseQuantityButton = this.productInfo.getByRole("button", { name: "Increase quantity" });
    private readonly addToCartButton = this.productInfo.getByRole("button", { name: "Add to Cart" });

    // Notifications & Post-Cart Actions
    private readonly successToast = this.page.locator(".toast[role='alert']");
    private readonly dismissToast = this.page.locator("[data-dismiss='toast']");
    private readonly successAlert = this.page.locator("#alert .alert.alert-success");
    private readonly viewCartButton = this.successToast.getByRole("link", { name: "View Cart" });
    private readonly checkoutButton = this.successToast.getByRole("link", { name: "Checkout" });

    async assertProductBreadcrumb(productName: string): Promise<void> {
        await expect(this.productBreadcrumb).toHaveText(productName);
    }

    async getAvailability(): Promise<string> {
        return await this.availability.innerText();
    }

    async getPrice(): Promise<string> {
        return await this.price.innerText();
    }

    async getQuantity(): Promise<string> {
        return await this.quantityInput.inputValue();
    }

    async setQuantity(quantity: string): Promise<void> {
        await this.quantityInput.fill(quantity);
    }

    async increaseQuantity(): Promise<void> {
        await this.increaseQuantityButton.click();
    }

    async decreaseQuantity(): Promise<void> {
        await this.decreaseQuantityButton.click();
    }

    async addToCart(): Promise<void> {
        await this.page.waitForLoadState("domcontentloaded");
        await this.addToCartButton.waitFor({ state: "visible" });
        await this.addToCartButton.click({ force: true });
    }

    async assertProductAddedToCart(
        productName: string
    ): Promise<void> {
        await expect(this.successToast).toBeVisible();
        await expect(this.successToast).toContainText(
            `Success: You have added ${productName} to your shopping cart!`
        );
        await this.dismissToast.click();
    }

    async clickViewCart(): Promise<void> {
        await this.viewCartButton.click();
    }

    async clickCheckout(): Promise<void> {
        await this.checkoutButton.click();
    }
}