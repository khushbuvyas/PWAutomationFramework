
import { test, expect } from '../src/fixtures/pagefixtures';



test.beforeEach(async ({ loginPage }) => {
    await loginPage.launchLoginPage();
    await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
    await loginPage.waitForPageLoad();
})

test('Verify home page title: ', async ({ homePage }) => {
    const title = await homePage.getPageTitle();
    console.log('Homepage title would be: ', title);
    expect(title).toBe('My Account');
})

test('Verify the logout link existance: ', async({ homePage })=>{
    expect(await homePage.isLogoutLinkExist()).toBeTruthy();
})

test('Verify Home page headers: ', async ({ homePage }) =>{

    let allHeaders: string[] = await homePage.getHeaders();
    console.log("Home page headers: ", allHeaders);
    expect.soft(allHeaders).toHaveLength(4)
    let expectedHeaders = ['My Account',
        'My Orders',
        'My Affiliate Account',
        'Newsletter'];

    expect.soft(allHeaders).toEqual(expectedHeaders);
})



// common testcase for all pages
test('Verify the company logo exist on the product page', async ({ genericPage}) => {
    expect( await genericPage.isLogoVisible()).toBeTruthy();
})

test('Verify the footers for the product info page', async ({ genericPage}) => {
    expect( await genericPage.getPageFootersCount()).toBe(16);
})