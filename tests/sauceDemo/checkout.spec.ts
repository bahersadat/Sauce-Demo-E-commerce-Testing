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
        await checkoutPage.SumOfPrices();
        await checkoutPage.cartPage.clickOnCheckoutBtn();
        await checkoutPage.cartPage.assertCheckoutBtn();
    });
    test('Negative scenario - Continue with empty form and assertion', async ({ page }) => {
        // click continue
        await checkoutPage.clickOnContinueBtn();
        // assert emtpy form submission
        await checkoutPage.assertEmptyFormSubmission();
    });
    test('Positive scenario - Continue with filled checkout information', async ({ page }) => {
        // fill the form
        await checkoutPage.fillCheckoutInfo('Jhon', 'Smith', '1001');
        // click on continue
        await checkoutPage.clickOnContinueBtn();
        // assert successfull submission
        await checkoutPage.assertCheckoutInfo();
    });
    test('Back to Cart page by canceling the checkout', async ({ page }) => {
        // click on cancel btn
        await checkoutPage.clickOnCancel();
        // assert cancellation
        await checkoutPage.assertCancel();
        
    });
    test.only('Calculation of total price and validation', async ({ page }) => {
        // fill checkout info
        await checkoutPage.fillCheckoutInfo('Jhon', 'Smith', '1001');
        // click on continue
        await checkoutPage.clickOnContinueBtn();
        // calculate total
        await checkoutPage.calculateTotal();
        // validate total
        await checkoutPage.validateTotal();

    })






});