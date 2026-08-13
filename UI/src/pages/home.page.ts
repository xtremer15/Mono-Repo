import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../utils/BasePage";

export class HomePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    private readonly shopByCategory = this.page.locator("#entry_217832")
    private readonly logo = this.page.locator(
        "img[alt='Poco Electro']"
    ).first();
    private readonly shopByCategoryItems = this.page.locator("ul.navbar-nav.vertical > li.nav-item");
    private readonly searchContainer = this.page.locator("#search");
    private readonly searchInput = this.searchContainer.getByRole("textbox", {
        name: "Search For Products",
    });
    private readonly searchCategoryDropdown = this.searchContainer.locator(
        ".dropdown-menu"
    );
    private readonly searchCategoryButton = this.searchContainer.getByRole(
        "button",
        { name: "All Categories" }
    );
    private readonly searchButton = this.searchContainer.getByRole(
        "button",
        { name: "Search" }
    );
    private readonly navbar = this.page.locator(
        "nav #widget-navbar-217834"
    );
    private readonly navbarCategories = this.navbar.locator(
        "li.nav-item"
    );
    private readonly cartButton = this.page.locator(
        '[data-id="217825"] a.cart'
    );
    private readonly cartItemCount = this.cartButton.locator(
        ".cart-item-total"
    );
    private readonly cartTotal = this.cartButton.locator(
        ".cart-items"
    );
    private readonly wishlistButton = this.page
        .getByRole("link", { name: "Wishlist" });
    private readonly compareButton = this.page
        .getByRole("link", { name: "Compare" });
    private readonly cartDrawer = this.page.locator(
        "#cart-total-drawer"
    );
    private readonly cartTotals = this.cartDrawer.locator(
        "table.table.mb-0 tbody tr"
    );
    private readonly editCartButton =
        this.cartDrawer.getByRole("button", {
            name: "Edit cart",
        });
    private readonly checkoutButton =
        this.cartDrawer.getByRole("button", {
            name: "Checkout",
        });
    // Toast (after add to cart)
    private readonly successToast = this.page.locator(".toast[role='alert']");
    private readonly toastViewCartButton = this.successToast.getByRole("link", { name: "View Cart" });
    private readonly toastCheckoutButton = this.successToast.getByRole("link", { name: "Checkout" });

    async selectTopMenuItem(
        itemToSelect: string,
        dropdownItem?: string
    ): Promise<void> {
        const item = this.navbar.getByRole("button", {
            name: itemToSelect,
            exact: false,
        });

        if (!dropdownItem) {
            await item.click();
            return;
        }

        const menuItem = item.locator("..");

        await item.hover();

        await menuItem
            .locator(".dropdown-menu")
            .getByRole("link", {
                name: dropdownItem,
                exact: true,
            })
            .click();
    }

    async clickLogo(): Promise<void> {
        await this.logo.click();
    }

    private getCategory(category: string): Locator {
        return this.navbarCategories.filter({
            has: this.page.getByRole("link", {
                name: category,
                exact: true,
            }),
        });
    }

    private getCategoryItem(
        category: string,
        item: string
    ): Locator {
        return this.getCategory(category)
            .locator(".dropdown-menu")
            .getByRole("link", {
                name: item,
                exact: true,
            });
    }

    async openShopByCategory(): Promise<void> {
        await this.shopByCategory.click();
    }


    async isCartDrawerVisible(): Promise<void> {
        return this.waitForElementVisibility(this.cartDrawer)
    }

    async selectCategoryItem(
        category: string,
        item: string
    ): Promise<void> {
        const categoryLocator = this.getCategory(category);

        await categoryLocator.hover();

        const dropdown = categoryLocator.locator(".dropdown-menu");

        await expect(dropdown).toBeVisible();

        await dropdown
            .getByRole("link", {
                name: item,
                exact: true,
            })
            .click();
    }

    async openSearchCategories(): Promise<void> {
        await this.searchCategoryButton.click();
    }

    async search(product: string): Promise<void> {
        await this.searchInput.clear()
        await this.searchInput.fill(product);
        await this.searchButton.click();
    }

    async selectSearchCategory(category: string): Promise<void> {
        await this.searchCategoryButton.click();

        await this.searchCategoryDropdown
            .getByRole("link", {
                name: category,
                exact: true,
            })
            .click();
    }


    async clickCart(): Promise<void> {
        await this.cartButton.waitFor({ state: "visible" });
        await this.cartButton.click();
    }

    async getCartItemCount(): Promise<string> {
        return await this.cartItemCount.innerText();
    }

    async getCartTotal(): Promise<string> {
        return await this.cartTotal.innerText();
    }

    async assertCartItemCount(count: string): Promise<void> {
        await expect(this.cartItemCount).toHaveText(count);
    }

    async assertCartTotal(total: string): Promise<void> {
        await expect(this.cartTotal).toHaveText(total);
    }

    private getCartTotalRow(label: string): Locator {
        return this.cartTotals.filter({
            hasText: label,
        });
    }

    async getCartTotalValue(label: string): Promise<string> {
        return await this.getCartTotalRow(label)
            .locator("td")
            .nth(1)
            .innerText();
    }

    async clickEditCart(): Promise<void> {
        await this.editCartButton.click();
    }

    async clickCheckout(): Promise<void> {
        await this.checkoutButton.click();
    }

    async clickWishlist(): Promise<void> {
        await this.wishlistButton.click();
    }

    async clickCompare(): Promise<void> {
        await this.compareButton.click();
    }

    async clickToastViewCart(): Promise<void> {
        await this.toastViewCartButton.click();
    }

    async clickToastCheckout(): Promise<void> {
        try {
            await this.toastCheckoutButton.waitFor({ state: 'visible', timeout: 5000 });
            await this.toastCheckoutButton.click({ force: true });
        } catch (error) {
            await this.clickCart();
            await this.isCartDrawerVisible();
            await this.clickCheckout();
        }
    }

    async selectShopByCategory(category: string): Promise<void> {
        await this.shopByCategoryItems
            .getByRole("link", {
                name: category,
                exact: true,
            })
            .click();
    }
}
