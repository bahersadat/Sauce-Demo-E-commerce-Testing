import { test, expect } from "@playwright/test";
import { LoginPage } from "../../page-objects/sauce-demo/Login.page";
import { MainShopPage } from "../../page-objects/sauce-demo/Main-shop.page";
import { SingleProductPage } from "../../page-objects/sauce-demo/Single-Product.page";
import { CartPage } from "../../page-objects/sauce-demo/Cart.page";


test.describe("Sauce Demo E-commerce Cart Page tests", () => {
  // declaring variables for Page Objects
  let loginPage: LoginPage;
  let mainShopPage: MainShopPage;
  let singleProductPage: SingleProductPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    // initializing variables
    loginPage = new LoginPage(page);
    mainShopPage = new MainShopPage(page);
    singleProductPage = new SingleProductPage(page);
    cartPage = new CartPage(page);

    // essential functions before each test
    await loginPage.visit();
    await loginPage.login(loginPage.validUsername, loginPage.validPassword);
    // add to cart any product you want based on the name of the product
    await mainShopPage.addToCart("Sauce Labs Onesie");
    await mainShopPage.addToCart("Sauce Labs Backpack");
    await mainShopPage.addToCart("Sauce Labs Bolt T-Shirt");
    // assert the number of added products
    await mainShopPage.assertNumberOfAddedProducts("3");
    // navigating to cart page
    await cartPage.visitCartPage();
    // assert cart page
    await cartPage.assertCartPage();
  });
  test("Click on product title - link test", async ({ page }) => {
    // click on product link
    await singleProductPage.clickOnProduct("Sauce Labs Onesie");
    // assert product link
    await singleProductPage.assertSProductDetails();
    // timout to see the action
    await page.waitForTimeout(3000);
  });
  test('Click on Remove Button and assertion', async ({ page }) => {
    // click on remove btn for second product
    await cartPage.remove(2);
    // assert remove
    await expect(cartPage.headerComponents.cartBadge).toContainText('2');
    // timout to see the action
    await page.waitForTimeout(3000);
  });
  test('Click on continue shopping button and assertion', async ({ page }) => {
    // click on continue shopping btn
    await cartPage.clickOnContinueShopping();
    // assert continue shopping
    await cartPage.assertContinueShopping();
    // timout to see the action
    await page.waitForTimeout(3000);
  });
  test('Click On Checkout Button and assertion', async ({ page }) => {
    // click on checkout btn
    await cartPage.clickOnCheckoutBtn();
    // assert checkout
    await cartPage.assertCheckoutBtn();
    // timout to see the action
    await page.waitForTimeout(3000);
  });

  

});
