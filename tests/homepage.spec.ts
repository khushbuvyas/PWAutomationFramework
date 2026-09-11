
import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';
import { LoginPage } from '../src/pages/LoginPage';

let loginPage: LoginPage;
let homePage: HomePage;

test.beforeEach(async ({ page }) => {

    loginPage = new LoginPage(page);
    await loginPage.launchLoginPage();
    await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
    await page.waitForLoadState('load');
    homePage = new HomePage(page);
})

test('Verify home page title: ', async ({ }) => {
    const title = await homePage.getPageTitle();
    console.log('Homepage title would be: ', title);
    expect(title).toBe('Account Login');
})

test('Verify the logout link existance: ', async({})=>{
    expect(await homePage.isLogoutLinkExist()).toBeTruthy();
})

test('Verify Home page headers: ', async ({}) =>{

    let allHeaders: string[] = await homePage.getHeaders();
    console.log("Home page headers: ", allHeaders);
    expect.soft(allHeaders).toHaveLength(4)
    let expectedHeaders = ['My Account',
        'My Orders',
        'My Affiliate Account',
        'Newsletter'];

    expect.soft(allHeaders).toEqual(expectedHeaders);
})