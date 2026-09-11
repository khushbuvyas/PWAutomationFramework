import { Locator, Page } from "@playwright/test";
import { GenericPage } from "./GenericPage";

export class RegisterAccPage extends GenericPage {

    // private Locators:
    private readonly header: Locator;
    private readonly firstName: Locator;
    private readonly lastName: Locator;
    private readonly email: Locator;
    private readonly telephone: Locator;
    private readonly password: Locator;
    private readonly passwordConfirm: Locator;
    private readonly newsletterSub: Locator;
    private readonly policy: Locator;
    private readonly continue: Locator;
    private readonly successMsg: Locator;




    // constructor of the class: init the locators
    constructor(page: Page) {
        super(page);
        this.header = page.getByRole('heading', { name: 'Register Account', level: 1 });
        this.firstName = page.getByRole('textbox', { name: 'First Name' });
        this.lastName = page.getByRole('textbox', { name: 'Last Name' });
        this.email = page.getByRole('textbox', { name: 'E-Mail' });
        this.telephone = page.getByRole('textbox', { name: 'Telephone' });
        this.password = page.getByRole('textbox', { name: '* Password', exact: true });
        this.passwordConfirm = page.getByRole('textbox', { name: '* Password Confirm' });
        this.newsletterSub = page.getByRole('radio', { name: 'Yes' });
        this.policy = page.locator('input[name="agree"]');
        this.continue = page.getByRole('button', { name: 'Continue' });
        this.successMsg = page.locator('div#content h1');
    };

    //public page actions(methods)/ behaviors

    async goToRegisterAccPage(){
        await this.page.goto('opencart/index.php?route=account/register');
    }
    async verifyHeader(): Promise<string> {
        return await this.header.innerText();
    }

    async registerUserAcc(firstname: string, lastname: string, email: string, telephone: string, password: string, confirmpass: string){

        await this.firstName.fill(firstname);
        await this.lastName.fill(lastname);
        await this.email.fill(email);
        await this.telephone.fill(telephone);
        await this.password.fill(password);
        await this.passwordConfirm.fill(confirmpass);
        await this.newsletterSub.click();
        await this.policy.check();
        await this.continue.click();
    }

    async verifySuccessRegAccMsg(): Promise<string>{
        return await this.successMsg.innerText(); 
    }

}
