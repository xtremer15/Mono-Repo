import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../utils/BasePage";


export class SearchPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    private readonly content = this.page.locator("#entry_212469");
    private readonly content2 = this.getEntry("entry_212408");
    // Search Criteria
    private readonly searchCriteria = this.page.locator("#entry_212457");
    private readonly searchTitle = this.page.locator(
        ".content-title h1.h4"
    );
    private readonly searchInput = this.searchCriteria.locator(
        "#input-search"
    );
    private readonly searchButton = this.searchCriteria.locator(
        "#button-search"
    );
    private readonly searchCategory = this.searchCriteria.locator(
        'select[name="category_id"]'
    );
    private readonly searchInDescription = this.searchCriteria.locator(
        "#description"
    );
    private readonly searchInSubcategories = this.searchCriteria.locator(
        "#sub_category"
    );
    // Display
    private readonly show = this.content.locator(
        'select[id^="input-limit-"]'
    );
    private readonly inputSortBy = this.content.locator(
        'select[id^="input-sort-"]'
    );
    // Products
    protected getEntry(entryId: string = "entry_212469", isFromCategory: boolean = false): Locator {
        const id = isFromCategory ? "entry_212408" : entryId;

        return this.page.locator(`#${id}`);
    }
    // Search
    async assertSearchCriteria(searchCriteria: string): Promise<void> {
        await expect(this.searchTitle).toHaveText(`Search - ${searchCriteria}`);

        await expect(this.searchInput).toHaveValue(searchCriteria);
    }

    async search(searchCriteria: string): Promise<void> {
        await this.searchInput.fill(searchCriteria);
        await this.searchButton.click();
    }

    async selectSearchCategory(category: string): Promise<void> {
        await this.searchCategory.selectOption({
            label: category,
        });
    }

    async toggleSearchInDescription(): Promise<void> {
        await this.searchInDescription.check();
    }

    async toggleSearchInSubcategories(): Promise<void> {
        await this.searchInSubcategories.check();
    }

    // Display
    async sortBy(option: string): Promise<void> {
        await this.inputSortBy.selectOption({
            label: option,
        });
    }

    async showItems(numberOfItems: string): Promise<void> {
        await this.show.selectOption({
            label: numberOfItems,
        });
    }

    // Products
    async selectProduct(productName: string, isFromCategory: boolean = false): Promise<void> {
        const content = this.getEntry(undefined, isFromCategory);
        const productList = await content.locator("div.product-layout");
        const productCards = await content.locator(".product-thumb .product-thumb-top");

        await productList.first().waitFor({ state: "visible" });
        const firstCard = productCards.first();
        
        await this.page.waitForLoadState("domcontentloaded");
        await firstCard.waitFor({ state: "visible" });
        await firstCard.click({ force: true });
    }
}