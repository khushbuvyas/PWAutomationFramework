import { test, expect } from '../src/fixtures/pagefixtures';
import { SearchResultPage } from '../src/pages/SearchResultPage';
import { Csvutils } from '../src/utils/Csvutils';




test.beforeEach(async ({ loginPage }) => {
    await loginPage.launchLoginPage();
    await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
})

test('Verify product details on the shopping cart page ', async ({ homePage, searchResultPage, productInfoPage, shoppingCartPage }) => {

    let addedProdDetails: Array<string>;
    await homePage.doSearch('macbook');
    await searchResultPage.selectProduct('MacBook Pro');
    await productInfoPage.addProducttoCart(3);
    await productInfoPage.clickOnShoppingCart();

    addedProdDetails = await shoppingCartPage.getAddedProductInfo();

    console.log(addedProdDetails);

})

