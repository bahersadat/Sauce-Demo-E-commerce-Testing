import { test, expect } from "@playwright/test";
import { LoginPage } from "../../page-objects/sauce-demo/Login.page";
import { MainShopPage } from "../../page-objects/sauce-demo/Main-shop.page";
import { SingleProductPage } from "../../page-objects/sauce-demo/Single-Product.page";

test.describe("Sauce Demo E-Commerce Single Product Page Tests", () => {
  // declaring variables for Page Objects
  let loginPage: LoginPage;
  let mainShopPage: MainShopPage;
  let singleProductPage: SingleProductPage;

  test.beforeEach(async ({ page }) => {
    // initializing variables
    loginPage = new LoginPage(page);
    mainShopPage = new MainShopPage(page);
    singleProductPage = new SingleProductPage(page);

    // essential functions before each test
    await loginPage.visit();
    await loginPage.login(loginPage.validUsername, loginPage.validPassword);
  });
  

  test.describe("Navigating to single product page and assertions", () => {
    test.beforeEach(async ({ page }) => {
      // click on a specific product link
      await singleProductPage.clickOnProduct("Sauce Labs Bike Light");
      // timeout to see the action
      await page.waitForTimeout(2000);
    });


    test("assert single product image", async ({ page }) => {
      await singleProductPage.assertSProductImg();
      // timeout to see the action
      await page.waitForTimeout(3000);
    });
    test("assert single product details", async ({ page }) => {
      // by number of product details container which should be 1
      await singleProductPage.assertSProductDetails();
      // timeout to see the action
      await page.waitForTimeout(3000);
    });
    test("add to cart button", async ({ page }) => {
      // click add to cart btn
      await singleProductPage.clickAddToCart();
      // assert number of added products to the cart - Reusibility concept implemented
      await singleProductPage.assertNumberOfAddedProducts("1");
      // timeout to see the action
      await page.waitForTimeout(3000);
    });
    test("remove button", async ({ page }) => {
      // click add to cart btn
      await singleProductPage.clickAddToCart();
      // assert number of added products to the cart - Reusibility concept implemented
      await singleProductPage.assertNumberOfAddedProducts("1");
      // click the remove button
      await singleProductPage.clickOnRemoveBtn();
      // assert remove button
      await singleProductPage.assertRemoveBtn();
      // timeout to see the action
      await page.waitForTimeout(3000);
    });
    test("back to to products button", async ({ page }) => {
      // click on back to products button
      await singleProductPage.clickOnBackToProductsBtn();
      // assert back to products btn
      await singleProductPage.assertBackToProductsBtn();
      // timeout to see the action
      await page.waitForTimeout(3000);
    });
  });
});
