
import { test, expect } from '../src/fixtures/pagefixtures';
import { Csvutils } from '../src/utils/Csvutils';
import { ExcelHelper } from '../src/utils/ExcelHelper';
import { Jsonutils } from '../src/utils/Jsonutils';



// AAA pattern - Arrange, Act and Assert

test.beforeEach('Launch the application', async ({ loginPage }) => {
    await loginPage.launchLoginPage();
});
test('Login page test', async ({ loginPage }) => {
    const title: string = await loginPage.getPageTitle();
    console.log("Login page title is : ", title);
    expect(title).toBe("Account Login");

});

test('Forgot password link existance', async ({ loginPage }) => {
    expect(await loginPage.isForgotPwdLinkExist()).toBeTruthy();
});

test('User is able to login in successfully', async ({ loginPage, homePage }) => {
    await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
    // expect pending - to be implemented
    expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy();
    expect.soft(await homePage.getPageTitle()).toEqual('My Account');
});

// DD_1. with Fixtures
// 1. sequence mode - 1 test is running with test data one by one - if 1 test fails then next test will not run (testdat with fixtures is not a good approach due to sequential execution of tests.)
test('Verify login with wrong credentials with fixtures', async ({ loginPage, testdata }) => {
    for (let data of testdata) {
        await loginPage.doLogin(data.username, data.password);
        expect.soft(await loginPage.getWarningMessage()).toContain('Warning: Your account has exceeded allowed number of login attempts.');
    }
});

// DD_2. without Fixtures
// 1. parallel mode - read csv data directly and loop test method row wise...

let testData = Csvutils.readCsv('src/testdata/SIT_Testdata.csv');

for (let data of testData) {
    test(`Verify login with wrong credentials - ${data.username} and ${data.password}`, async ({ loginPage }) => {
        await loginPage.doLogin(data.username, data.password);
        expect.soft(await loginPage.getWarningMessage()).toContain('Warning: Your account has exceeded allowed number of login attempts.');
    });
}

//DD_3. MS excel - office latest
//xlsx format
//maintenance
let loginTestDataExcel = ExcelHelper.readExcel('src/testdata/OpenCartTestData.xlsx', 'login');
for (let row of loginTestDataExcel) {
    test(`invalid login test with excel data - ${row.username}`, async ({ loginPage }) => {
        await loginPage.doLogin(row.username, row.password);
        expect.soft(await loginPage.getWarningMessage()).toContain('Warning: Your account has exceeded allowed number of login attempts.');
    });
};


// DD_4. with Json

let testdataJson = Jsonutils.readJson('src/testdata/loginData.json');

for (let data of testdataJson) {
    test(`Verify login with wrong credentials with Json data - ${data.username} and ${data.password}`, async ({ loginPage }) => {
        await loginPage.doLogin(data.username, data.password);
        expect.soft(await loginPage.getWarningMessage()).toContain('Warning: Your account has exceeded allowed number of login attempts.');
    });
}



// common testcase for all pages
test('Verify the company logo exist on the product page', async ({ genericPage}) => {
    expect( await genericPage.isLogoVisible()).toBeTruthy();
})

test('Verify the footers for the product info page', async ({ genericPage}) => {
    expect( await genericPage.getPageFootersCount()).toBe(16);
})
