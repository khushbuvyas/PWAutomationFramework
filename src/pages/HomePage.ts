

import { Locator, Page } from "@playwright/test";
import { GenericPage } from "./GenericPage";

export class HomePage extends GenericPage {

    // private final (constant) Locators:
    private readonly logoutlink: Locator;
    private headers: Locator;
    // private readonly search: Locator;
    // private readonly searchIcon: Locator;
    

    // constructor of the class: init the locators
    constructor(page: Page) {
        super(page);
        this.headers = page.getByRole('heading', { level: 2 });
        this.logoutlink = page.getByRole('link', { name: 'Logout' }).last();
        /* -- IGNORE --- declared in GenericPage.ts file
        // this.search = page.getByRole('textbox', { name: 'Search' });
        // this.searchIcon = page.locator('div#search button');
        */
    };

// Initialize the locator headers using arrow function and calling this function into pagefixtures.ts file
// For this the locator variable must not be declared as readonly.
    homePagelocators = async (page: Page) => {
        this.headers = page.getByRole('heading', { level: 2 });
    };

    //public page actions(methods)/ behaviors

    // --IGNORE-- declared in GenericPage.ts file
    // async getHomepageTitle(): Promise<string> {
    //     return await this.page.title();
    // }

    async isLogoutLinkExist(): Promise<boolean> {
        return await this.logoutlink.isVisible();
    }

    async getHeaders(): Promise<string[]> {

      return  await this.headers.allInnerTexts();

    }
    
    async doSearch(searchKey: string): Promise<void> {
        console.log(`search key: ${searchKey}`);
        await this.searchBox.fill(searchKey);
        await this.searchImage.click();
    }
}