import { test, expect } from '../src/fixtures/pagefixtures';
import { SearchResultPage } from '../src/pages/SearchResultPage';
import { Csvutils } from '../src/utils/Csvutils';




test.beforeEach(async ({ loginPage }) => {
    await loginPage.launchLoginPage();
    await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
    await loginPage.waitForPageLoad();
})

test('Verify product image count ', async ({ homePage, searchResultPage, productInfoPage }) => {

    await homePage.doSearch('macbook');
    await searchResultPage.selectProduct('MacBook Pro');
    let imageCount = await productInfoPage.getProductImagesCount();
    console.log("Total images are: ", imageCount);

    expect(imageCount).toBe(4);

})

test('Verify product Information/Data ', async ({ homePage, searchResultPage, productInfoPage }) => {

    await homePage.doSearch('macbook');
    await searchResultPage.selectProduct('MacBook Pro');

    let actualProdInfoMap = await productInfoPage.getProductInfo();
    console.log("Actual Product Details: ", actualProdInfoMap);

    expect.soft(actualProdInfoMap.get('ProductHeader')).toBe('MacBook Pro');
    expect.soft(actualProdInfoMap.get('Brand')).toBe('Apple');
    expect.soft(actualProdInfoMap.get('Product Code')).toBe('Product 18');
    expect.soft(actualProdInfoMap.get('Reward Points')).toBe('800');
    expect.soft(actualProdInfoMap.get('ProductPrice')).toBe('$2,000.00');
    expect.soft(actualProdInfoMap.get('ExTaxPrice')).toBe('$2,000.00');

})

const testdata = Csvutils.readCsv('src/testdata/product.csv');
// testcase with Data driven
let count = 0;
for (let data of testdata) {

    test(`Verify product Information/Data for ${data.productname}`, async ({ homePage, searchResultPage, productInfoPage }) => {

        if (count <= 0) {
            await homePage.doSearch(data.searchkey);
            await searchResultPage.selectProduct(data.productname);

            let actualProdInfoMap = await productInfoPage.getProductInfo();
            console.log("Actual Product Details: ", actualProdInfoMap);

            expect.soft(actualProdInfoMap.get('ProductHeader')).toBe(data.productheader);
            expect.soft(actualProdInfoMap.get('Brand')).toBe(data.brand);
            expect.soft(actualProdInfoMap.get('Product Code')).toBe(data.productcode);
            expect.soft(actualProdInfoMap.get('Reward Points')).toBe(data.rewardpoints);
            expect.soft(actualProdInfoMap.get('ProductPrice')).toBe(data.price);
            expect.soft(actualProdInfoMap.get('ExTaxPrice')).toBe(data.taxprice);

        }
    })

    count++;

}


// common testcase for all pages
test('Verify the company logo exist on the product page', async ({ genericPage }) => {
    expect(await genericPage.isLogoVisible()).toBeTruthy();
})

test('Verify the footers for the product info page', async ({ genericPage }) => {
    expect(await genericPage.getPageFootersCount()).toBe(16);
})

test('Add product to shopping cart and verify success msg', async ({ homePage, searchResultPage, productInfoPage }) => {

    await homePage.doSearch('macbook');
    await searchResultPage.selectProduct('MacBook Pro');

    await productInfoPage.addProducttoCart(3);
    expect(await productInfoPage.getSuccessMsg()).toContain('Success: You have added');

})



// Assignament - Add the Quantity in the product info page then click on Add to cart- Done
// Verify the message after click and click on the Shopping cart-Done
// Create the shopping cart page and spec file.-Partial Done
// Create the checkout page as well- Pending

