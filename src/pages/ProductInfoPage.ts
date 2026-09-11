import { Locator, Page } from "@playwright/test";
import { GenericPage } from "./GenericPage";

// Map usecase-
export class ProductInfoPage extends GenericPage {

    // private final (constant) Locators:
    private readonly prodHeader: Locator;
    private readonly prodImage: Locator;
    private readonly prodPrice: Locator
    private readonly prodMetadata: Locator;
    private map: Map<string, string | number>;
    private readonly prodQty: Locator;
    private readonly addToCartBtn: Locator;
    private readonly successMsg: Locator;
    private readonly shoppingCartLink: Locator;

    // constructor of the class: init the locators
    constructor(page: Page) {
        super(page);
        this.prodHeader = page.locator('h1');
        this.prodImage = page.locator('div#content li img');
        this.prodMetadata = page.locator('div#content ul.list-unstyled:nth-of-type(1) li');
        this.prodPrice = page.locator('div#content ul.list-unstyled:nth-of-type(2) li');
        this.map = new Map<string, string>();
        this.prodQty = page.getByRole('textbox', { name: 'Qty' });
        this.addToCartBtn = page.getByRole('button', { name: 'Add to Cart' });
        this.successMsg = page.locator('div.alert.alert-success');
        this.shoppingCartLink = page.locator('div.alert.alert-success a').last();
    };

    //actions:

    async getProductHeader(): Promise<string> {
        return await this.prodHeader.innerText();
    }

    async getProductImagesCount(): Promise<number> {
        //  await this.page.waitForTimeout(4000);
        await this.prodImage.first().waitFor({ state: 'visible' });
        return await this.prodImage.count();
    }
    /**
     * 
     * @returns This method is returning the actual product data: header, images, metadata, pricing data.
     */
    async getProductInfo(): Promise<Map<string, string | number>> {
        this.map.set('ProductHeader', await this.getProductHeader());
        this.map.set('ProductImages', await this.getProductImagesCount());
        await this.getProductMetaData();
        await this.getProductPricingData();

        return this.map;
    }

    //Brand: Apple
    //Product Code: Product 18
    //Reward Points: 800
    //Availability: Out Of Stock
    private async getProductMetaData(): Promise<void> {
        let metadata = await this.prodMetadata.allInnerTexts();

        for (let data of metadata) {
            let meta = data.split(":");
            let metaKey = meta[0].trim();
            let metaVal = meta[1].trim();

            this.map.set(metaKey, metaVal);
        }

    }

    //$2,000.00
    // Ex Tax: $2,000.00
    private async getProductPricingData(): Promise<void> {
        let priceData = await this.prodPrice.allInnerTexts();

        let productPrice = priceData[0].trim();
        let exTaxPrice = priceData[1].split(':')[1].trim();

        this.map.set('ProductPrice', productPrice);
        this.map.set('ExTaxPrice', exTaxPrice);
    }

    async addProducttoCart(qty: number) {
        await this.prodQty.fill(qty.toString());
        await this.addToCartBtn.click();
    }

    async getSuccessMsg(): Promise<string> {
        return this.successMsg.innerText();
    }

    async clickOnShoppingCart(): Promise<void> {
        await this.shoppingCartLink.click();
    }

}

