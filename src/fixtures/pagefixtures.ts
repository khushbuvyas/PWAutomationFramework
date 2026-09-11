
import {test as baseTest} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { SearchResultPage } from '../pages/SearchResultPage';
import { RegisterAccPage } from '../pages/RegisterAccPage';
import { Csvutils } from '../utils/Csvutils';
import { ProductInfoPage } from '../pages/ProductInfoPage';
import { GenericPage } from '../pages/GenericPage';
import { ShoppingCartPage } from '../pages/ShoppingCartPage';

// define types for page fixtures:
type pageFixtures = {
    loginPage: LoginPage,
    homePage: HomePage,
    searchResultPage: SearchResultPage,
    registerAccPage: RegisterAccPage,
    productInfoPage: ProductInfoPage,
    shoppingCartPage: ShoppingCartPage,
    genericPage: GenericPage,
    testdata: Record<string, string>[]
}

//extend playwright baseTest:
export let test = baseTest.extend<pageFixtures> ({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
       // await loginPage.launchLoginPage();
        await use(loginPage);
    },
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await homePage.homePagelocators(page);
        await use(homePage);
    },

    searchResultPage: async ({ page }, use) => {
        const searchResultPage = new SearchResultPage(page);
        await use(searchResultPage);
    },

    registerAccPage: async ({ page }, use) => {
        const registerAccPage = new RegisterAccPage(page);
        await use(registerAccPage);
    },

     productInfoPage: async ({ page }, use) => {
        const productInfoPage = new ProductInfoPage(page);
        await use(productInfoPage);
    },

    shoppingCartPage: async({page}, use) =>{
        const shoppingCartPage = new ShoppingCartPage(page);
        await use(shoppingCartPage);
    },

    genericPage: async ({page}, use) => {
        const genericPage = new GenericPage(page);
        await use(genericPage);

    },

    testdata: async ({}, use) => {
        const testData = Csvutils.readCsv('./src/testdata/SIT_Testdata.csv');
        await use(testData);
    }
})


export { expect } from '@playwright/test';

//page object
//test data
//states .json