
import { Locator, Page } from '@playwright/test';

export class GenericPage {

    protected readonly page: Page;

    // common locators for all pages
    protected readonly logo: Locator;
    protected readonly searchBox: Locator;
    protected readonly searchImage: Locator;
    protected readonly footerlink: Locator;
    protected readonly currency: Locator;
    protected readonly cartButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.logo = page.getByAltText('naveenopencart');
        this.searchBox = page.getByPlaceholder('Search');
        this.searchImage = page.locator('div#search button');
        this.currency = page.locator('#form-currency');
        this.footerlink = page.locator('footer a');
        this.cartButton = page.locator('div#cart button')
    }


    // helper/generice functions


    /* 
    Defining generic action methods is not a good approach with Playwright as its handles waits, error, sync internally.
    If we do then its adding extra layer to it. which it already handalling it.
     async clickOnElement(locator: Locator){
         await this.page.locator.click();
     }
 
     //clickOnElement -- click
     //fillValue -- fill
     //getText -- innerText
 
     */

    // common locators / functionalities / actoions
    async isLogoVisible(): Promise<boolean> {
        return this.logo.isVisible();
    }

    async isSearchBoxVisible(): Promise<boolean> {
        return this.searchBox.isVisible();
    }

    async isCurrencyVisible(): Promise<boolean> {
        return this.currency.isVisible();
    }

    async isCartBtnVisible(): Promise<boolean> {
        return this.cartButton.isVisible();
    }

    async getPageFootersCount(): Promise<number> {
        return await this.footerlink.count();
    }

    async getPageFooters(): Promise<string[]> {

        return this.footerlink.allInnerTexts();
    }


    async getPageTitle(): Promise<string> {

        return await this.page.title();
    }


    getPageURL(): string {

        return this.page.url();
    }

    async waitForPageLoad() {
        await this.page.waitForLoadState('load');
    }

    async takeScreenshot(name: string){
        return await this.page.screenshot({
            fullPage: true,
            path: `reports/screenshot/${name}.png`
        });
    }

}