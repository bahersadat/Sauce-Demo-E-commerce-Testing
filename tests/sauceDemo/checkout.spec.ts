import { test, expect } from '@playwright/test';
import { CheckoutPage } from '../../page-objects/sauce-demo/Checkout.page';

test.describe('Sauce Demo E-commerce Checkout Page Tests', () => {
    // declaring variables for Page Objects
    let checkoutPage: CheckoutPage;

    test.beforeEach(async ({ page }) => {
        // initializing variables
        checkoutPage = new CheckoutPage(page);

        // essential functions before each test
        await checkoutPage.loginPage.visit();
        await checkoutPage.loginPage.login("standard_user", "secret_sauce");
        await checkoutPage.mainShopPage.addToCart('Sauce Labs Onesie');
        await checkoutPage.mainShopPage.addToCart('Sauce Labs Backpack');
        await checkoutPage.mainShopPage.addToCart('Sauce Labs Bolt T-Shirt');
        await checkoutPage.mainShopPage.clickOnCartComp();
        await checkoutPage.cartPage.clickOnCheckoutBtn();
        await checkoutPage.cartPage.assertCheckoutBtn();
    });
    test.only('Continue with empty form', async ({ page }) => {
        // click continue
        await checkoutPage.clickOnContinueBtn();
        // assert emtpy form submission
        await checkoutPage.assertEmptyFormSubmission();
    })






});