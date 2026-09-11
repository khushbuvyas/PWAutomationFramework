import { Locator, Page } from "@playwright/test";
import { GenericPage } from "./GenericPage";

// Map usecase-
export class ShoppingCartPage extends GenericPage {

    // private final (constant) Locators:
    private readonly pageHeader: Locator;
    private readonly cartProdTableHeader: Locator;
    private readonly cartProdTableRow: Locator;
    private readonly cartProdTableCell: Locator;
    private readonly selectedProdImg: Locator;
    private readonly selectedProdName: Locator;
    private readonly selectedProdModel: Locator;
    private readonly selectedProdQty: Locator;
    private readonly selectedProdUnitPrice: Locator;
    private readonly selectedProdTotal: Locator;

    private readonly cartValues: Array<string>;

    // constructor of the class: init the locators
    constructor(page: Page) {
        super(page);
        this.pageHeader = page.getByRole('heading', {level: 1});
        this.cartProdTableHeader = page.locator('div.table-responsive table tr').first();
        this.cartProdTableRow = page.locator('div.table-responsive table tr').filter({hasText: 'MacBook Pro'});
        this.cartProdTableCell = page.locator('div.table-responsive table tr').filter({hasText: 'MacBook Pro'}).locator("td");
        this.selectedProdImg = page.locator('div.table-responsive table tr').filter({hasText: 'MacBook Pro'}).getByAltText("MacBook Pro");
        this.selectedProdName = page.locator('div.table-responsive table tr').filter({hasText: 'MacBook Pro'}).getByRole("link", { name: "MacBook Pro" }).last();
        this.selectedProdModel = page.locator('div.table-responsive table tr').filter({hasText: 'MacBook Pro'}).locator('td').nth(2);
        this.selectedProdQty = page.locator('div.table-responsive table tr').filter({hasText: 'MacBook Pro'}).locator('td').nth(3).locator('input');
        this.selectedProdUnitPrice = page.locator('div.table-responsive table tr').filter({hasText: 'MacBook Pro'}).locator('td').nth(4);
        this.selectedProdTotal = page.locator('div.table-responsive table tr').filter({hasText: 'MacBook Pro'}).locator('td').nth(5);
        this.cartValues = new Array<string>;
    };

    //actions:

    async getProductHeader(): Promise<string> {
        return await this.pageHeader.innerText();
    }

    async verifyProdImage(): Promise<boolean> {
        return await this.selectedProdImg.isVisible();
    }

    async getAddedProductInfo(): Promise<Array<string>>{

      await this.selectedProdImg.waitFor({state: 'visible'});
      this.cartValues.push(await this.selectedProdName.innerText());
      this.cartValues.push(await this.selectedProdModel.innerText());
      this.cartValues.push(await this.selectedProdQty.inputValue());
      this.cartValues.push(await this.selectedProdUnitPrice.innerText());
      this.cartValues.push(await this.selectedProdTotal.innerText());

      return this.cartValues;

    }

}