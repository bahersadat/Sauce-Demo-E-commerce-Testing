import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./Base.page";

export class LoginPage extends BasePage{

    readonly userName: Locator;
    readonly password: Locator;
    readonly loginBtn: Locator;
    readonly loginError: Locator;
    readonly validUsername: string;
    readonly validPassword: string;
    readonly assertProductTitle:Locator;


    constructor(page:Page){
        super(page);
        this.userName = page.locator('#user-name');
        this.password = page.locator('#password');
        this.loginBtn = page.locator('#login-button');
        this.loginError = page.locator('h3[data-test="error"]');
        this.validUsername = 'standard_user';
        this.validPassword = 'secret_sauce';
        this.assertProductTitle = page.locator('span.title');
    }

    async visit() {
        await super.baseUrl("");
    }

    async login(username:string, password:string){
        await this.userName.type(username);
        await this.password.type(password);
        await this.loginBtn.click();
    }

    async assertErrUserNameRequired() {
        await expect(this.loginError).toContainText('Epic sadface: Username is required');
    }
    async assertErrPasswordRequired() {
        await expect(this.loginError).toContainText('Epic sadface: Password is required');
    }
    async assertErrInvalidCredentials() {
        await expect(this.loginError).toContainText('Epic sadface: Username and password do not match any user in this service');
    }
    async assertSuccessfulLogin() {
        await expect(this.assertProductTitle).toBeVisible();
        await expect(this.assertProductTitle).toContainText('Products');
        await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
    }

    
}