import { test, expect } from "@playwright/test";
import { MainShopPage } from "../../page-objects/sauce-demo/main-shop.page";

test.describe("Sauce Demo E-Commerce Main Shop Page Tests", () => {
  // declaring variables for Page Objects
  let mainShopPage: MainShopPage;

  test.beforeEach(async ({ page }) => {
    // initializing variables
    mainShopPage = new MainShopPage(page);

    // essential functions before each test
    await mainShopPage.loginPage.visit();
    await mainShopPage.loginPage.login(mainShopPage.loginPage.validUsername, mainShopPage.loginPage.validPassword);
  });

  test("Add to cart + assertion test", async ({ page }) => {
    // add to cart any product you want based on the name of the product
    await mainShopPage.addToCart("Sauce Labs Onesie");
    await mainShopPage.addToCart("Sauce Labs Backpack");
    await mainShopPage.addToCart("Sauce Labs Bolt T-Shirt");
    // assert the number of added products
    await mainShopPage.assertNumberOfAddedProducts("3");
    await page.waitForTimeout(3000);
  });
  test.describe('Sorting Component and assertions', () => {
    // sort the products based on these values: az, za, lohi, hilo
    // timout to let us see the action
    test("Sorting the products in A-Z order", async ({ page }) => {
      await mainShopPage.sort("az");
      await page.waitForTimeout(3000);
    });
    test("Sorting the products in Z-A order", async ({ page }) => {
      await mainShopPage.sort("za");
      await page.waitForTimeout(3000);
    });
    test("Sorting the products in high to low order", async ({ page }) => {
      await mainShopPage.sort("hilo");
      await page.waitForTimeout(3000);
    });
    test("Sorting the products in low to high order", async ({ page }) => {
      await mainShopPage.sort("lohi");
      await page.waitForTimeout(3000);
    });
  
    test("Sorting the products and add to cart + assertion test", async ({
      page,
    }) => {
      await mainShopPage.sort("hilo");
      // add to cart test - check if add to cart still works
      await mainShopPage.addToCart("Sauce Labs Bolt T-Shirt");
      await mainShopPage.addToCart("Sauce Labs Onesie");
      await mainShopPage.addToCart("Sauce Labs Backpack");
      // assert the number of added products to the cart - Reusibility concept implemented
      await mainShopPage.assertNumberOfAddedProducts("3");
      await page.waitForTimeout(3000);
    });

  });
  
  test("Product link test", async ({ page }) => {
    // click on specific product name
    await mainShopPage.clickOnProduct("Sauce Labs Onesie");
    // assert navigation to single product page
    await mainShopPage.assertProductLink();
    await page.waitForTimeout(3000);
  });
  test.describe("Menu component test", () => {
    // Click on Menu link and assertion in before each test 
    test.beforeEach(async ({ page }) => {
      // click on menu link
      await mainShopPage.clickOnMenuComp();
      // asserting menu component
      await mainShopPage.assertMenuComp();
      // timout to let us see the action
      await page.waitForTimeout(2000);
    });
    test('Click on About link and assertion', async ({ page }) => {
      // click on about link
      await mainShopPage.clickOnAboutComp();
      // asserting about component by url
      await mainShopPage.assertAboutComp();
      // timout to let us see the action
      await page.waitForTimeout(3000);
    });
    test('Click on Logout link and assertion', async ({ page }) => {
      // click on logout link
      await mainShopPage.clickOnLogoutComp();
      // asserting logout component by url
      await mainShopPage.assertLogoutComp();
      // timout to let us see the action
      await page.waitForTimeout(3000);

    });
    test('Click on Reset App State link and assertion', async ({ page }) => {
      // adding some products to the cart
      await mainShopPage.addToCart('Sauce Labs Fleece Jacket');
      await mainShopPage.addToCart('Sauce Labs Bolt T-Shirt');
      await mainShopPage.addToCart('Test.allTheThings() T-Shirt (Red)');
      // assert the number of added products
      await mainShopPage.assertNumberOfAddedProducts("3");
      // click on reset app state
      await mainShopPage.clickOnResetComp();
      // assert reset component
      await mainShopPage.assertResetComp();
      // timout to let us see the action
      await page.waitForTimeout(3000);
    });
    test('Click on All Items link and assertion', async ({ page }) => {
      // adding some products to the cart
      await mainShopPage.addToCart('Sauce Labs Fleece Jacket');
      await mainShopPage.addToCart('Sauce Labs Bolt T-Shirt');
      await mainShopPage.addToCart('Test.allTheThings() T-Shirt (Red)');
      // assert the number of added products
      await mainShopPage.assertNumberOfAddedProducts("3");
      // navigating to Cart Page - using stubs concept, think of a scenario that cart page is not fully developed.
      await mainShopPage.clickOnCartComp();
      // assert cart page
      await mainShopPage.assertCartComp();
      // click on menu component
      await mainShopPage.clickOnMenuComp();
      // assert menu component
      await mainShopPage.assertMenuComp();
      // click on all items component
      await mainShopPage.clickOnAllItemsComp();
      //assert all items component
      await mainShopPage.assertAllItemsComp();
      // timout to let us see the action
      await page.waitForTimeout(3000);
    });
  });
});
