
import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { HomePage } from '../src/pages/HomePage';


// AAA pattern - Arrange, Act and Assert

let loginPage: LoginPage;
let homePage: HomePage;

test.beforeEach('Launch the application', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.launchLoginPage();
    homePage = new HomePage(page);
});
test('Login page test', async ({  }) => {
    const title: string = await loginPage.getPageTitle();
    console.log("Login page title is : ", title);

    expect(title).toBe("Account Login");

});

test('Forgot password link existance', async ({  }) => {
    expect(await loginPage.isForgotPwdLinkExist()).toBeTruthy();
});

test('User is able to login in successfully', async ({  }) => {
    await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
    // expect pending - to be implemented
    expect(await homePage.isLogoutLinkExist()).toBeTruthy();
    expect(await homePage.getPageTitle()).toEqual('My Account');
});