import { expect, Locator, Page } from '@playwright/test';
import { LoginPage } from '../../page-objects/sauce-demo/Login.page';
import { MainShopPage } from '../../page-objects/sauce-demo/Main-shop.page';
import { HeaderComponents } from '../../page-objects/sauce-demo/components/primary-header.comp';
import { CartPage } from '../../page-objects/sauce-demo/Cart.page';


export class CheckoutPage{
    // Pages and Components
    readonly page:Page;
    readonly loginPage: LoginPage;
    readonly mainShopPage: MainShopPage;
    readonly cartPage: CartPage;
    readonly headerComponents: HeaderComponents;

    // Selectors
    readonly continueBtn: Locator;
    readonly continueEmptyErr: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly zipCode: Locator;

    constructor(page:Page){
        // Pages and Components
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.mainShopPage = new MainShopPage(page);
        this.cartPage = new CartPage(page);
        this.headerComponents = new HeaderComponents(page);

        // Selectors
        this.continueBtn = page.locator('#continue');
        this.continueEmptyErr = page.locator('h3[data-test="error"]');
        this.firstName = page.locator('#first-name');
        this.lastName = page.locator('#last-name');
        this.zipCode = page.locator('#postal-code');

    }
    async clickOnContinueBtn(){
        await this.continueBtn.click();
    }
    async assertEmptyFormSubmission(){
        await expect(this.continueEmptyErr).toBeVisible();
    }
    async fillCheckoutInfo(first_name:string, last_name:string, zip_code:string){
        await this.firstName.fill(first_name);
        await this.lastName.fill(last_name);
        await this.zipCode.fill(zip_code);
    }
    async assertCheckoutInfo(){
        await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
    }
    
}