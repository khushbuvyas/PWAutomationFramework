import { Locator, Page } from "@playwright/test";
import { GenericPage } from "./GenericPage";

export class LoginPage extends GenericPage {

    // private Locators:
    private readonly emailId: Locator;
    private readonly password: Locator;
    private readonly loginBtn: Locator;
    private readonly forgottenPasswordLink: Locator;
   // private readonly logo: Locator;
    private readonly loginErrorMsg: Locator;

    // constructor of the class: init the locators
    constructor(page: Page) {
        super(page);
        this.emailId = page.getByRole('textbox', { name: 'E-Mail Address' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.loginBtn = page.getByRole('button', { name: 'Login' });
        this.forgottenPasswordLink = page.getByRole('link', { name: 'Forgotten Password' }).first();
      //  this.logo = page.getByAltText('naveenopencart');
        this.loginErrorMsg = page.getByText('Warning: Your account has exceeded allowed number of login attempts.');
    };

    //public page actions(methods)/ behaviors

    async launchLoginPage(): Promise<void> {
        await this.page.goto('opencart/index.php?route=account/login');

    }
  
    /* -- IGNORE -- declared in GenericPage.ts file
    async getTitle(): Promise<string> {
        return await this.page.title();
    }
        */

    async isForgotPwdLinkExist(): Promise<boolean> {
        return await this.forgottenPasswordLink.isVisible();
    }

    async doLogin(username: string, password: string): Promise<void> {
        console.log(`user ${username} is login in to the application`);
        await this.emailId.fill(username);
        await this.password.fill(password);
        await this.loginBtn.click();
    }

    async getWarningMessage(): Promise<string> {
        return await this.loginErrorMsg.innerText();
    }

}