

import { Locator, Page } from "@playwright/test";
import { GenericPage } from "./GenericPage";

export class SearchResultPage extends GenericPage {

    // private Locators:
    private readonly searchResults: Locator;
    

    // constructor of the class: init the locators
    constructor(page: Page) {
        super(page);
        this.searchResults= page.locator('div.product-layout');
    };

    //public page actions(methods)/ behaviors

    async getProductResultCount(): Promise<number> {
        return await this.searchResults.count();
    }

    async selectProduct(productName: string): Promise<void> {
        await this.page.getByRole('link', { name: productName }).first().click();
    }
}