import { expect, Locator, Page } from '@playwright/test';
import { HeaderComponents } from '../../page-objects/sauce-demo/components/primary-header.comp';



export class CartPage{

    // Pages and Components
    readonly page: Page;
    readonly headerComponents: HeaderComponents;
    
    

    // Selectors
    readonly continueShopping:Locator;
    readonly checkoutBtn: Locator;
    
    

    constructor(page:Page) {
        // Pages and Components
        this.page = page;
        this.headerComponents = new HeaderComponents(page);

        // Selectors
        this.continueShopping = page.locator('#continue-shopping');
        this.checkoutBtn = page.locator('#checkout')
        
        
        
    }
    async visitCartPage(){
        await this.headerComponents.cartLink.click();
    }
    async assertCartPage(){
        await expect(this.page).toHaveURL('https://www.saucedemo.com/cart.html');
    }
    async remove(removeNumber){
        await this.page.locator(`:nth-match(:text("Remove"),${removeNumber})`).click();
    }
    async clickOnContinueShopping(){
        await this.continueShopping.click();
    }
    async assertContinueShopping(){
        await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
    }
    async clickOnCheckoutBtn(){
        await this.checkoutBtn.click();
    }
    async assertCheckoutBtn(){
        await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
    }
   
}