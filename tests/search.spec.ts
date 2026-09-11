import { test, expect } from '../src/fixtures/pagefixtures';
import { HomePage } from '../src/pages/HomePage';
import { SearchResultPage } from '../src/pages/SearchResultPage';
import { Csvutils } from '../src/utils/Csvutils';



test.beforeEach(async ({ loginPage }) => {
    await loginPage.launchLoginPage();
    await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
})

test('Verify search result count ', async ({ homePage, searchResultPage }) => {

    await homePage.doSearch('macbook');
    expect(await searchResultPage.getProductResultCount()).toBe(3);
})

test('Verify user is able to land on the product page', async ({ homePage, searchResultPage, page }) => {

    await homePage.doSearch('macbook');
    await searchResultPage.selectProduct('MacBook Pro');
    expect(await page.title()).toBe('MacBook Pro');
})


// Using Data Driven approach - read data from csv file and loop through the test method
const testdata = Csvutils.readCsv('src/testdata/product.csv');

for (let data of testdata) {

    test(`Verify search result count ${data.searchkey} - ${data.productname}`, async ({ homePage, searchResultPage }) => {

        await homePage.doSearch(data.searchkey);
        expect(await searchResultPage.getProductResultCount()).toBe(Number(data.resultcount));
    })

}

for (let data of testdata) {

    test(`Verify user is able to land on the product page ${data.searchkey} - ${data.productname}`, async ({ homePage, searchResultPage, page }) => {

        await homePage.doSearch(data.searchkey);
        await searchResultPage.selectProduct(data.productname);
        expect(await page.title()).toBe(data.productname);
    })
}



// common testcase for all pages
test('Verify the company logo exist on the product page', async ({ genericPage}) => {
    expect( await genericPage.isLogoVisible()).toBeTruthy();
})

test('Verify the footers for the product info page', async ({ genericPage}) => {
    expect( await genericPage.getPageFootersCount()).toBe(16);
})