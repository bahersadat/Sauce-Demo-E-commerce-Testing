import { expect, Locator, Page } from "@playwright/test";
import { LoginPage } from "../../page-objects/sauce-demo/Login.page";
import { MainShopPage } from "../../page-objects/sauce-demo/Main-shop.page";
import { HeaderComponents } from "../../page-objects/sauce-demo/components/primary-header.comp";
import { CartPage } from "../../page-objects/sauce-demo/Cart.page";

var calcTotal = 0;

export class CheckoutPage {
  // Pages and Components
  readonly page: Page;
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
  readonly cancelCheckout: Locator;
  readonly tax: Locator;
  readonly summaryTotal: Locator;
  readonly finishBtn: Locator;
  readonly completedHeader:Locator;

  constructor(page: Page) {
    // Pages and Components
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.mainShopPage = new MainShopPage(page);
    this.cartPage = new CartPage(page);
    this.headerComponents = new HeaderComponents(page);

    // Selectors
    this.continueBtn = page.locator("#continue");
    this.continueEmptyErr = page.locator('h3[data-test="error"]');
    this.firstName = page.locator("#first-name");
    this.lastName = page.locator("#last-name");
    this.zipCode = page.locator("#postal-code");
    this.cancelCheckout = page.locator("#cancel");
    this.tax = page.locator(".summary_tax_label");
    this.summaryTotal = page.locator(".summary_total_label");
    this.finishBtn = page.locator('#finish');
    this.completedHeader = page.locator('h2.complete-header');
  }
  async clickOnContinueBtn() {
    await this.continueBtn.click();
  }
  async assertEmptyFormSubmission() {
    await expect(this.continueEmptyErr).toBeVisible();
  }
  async fillCheckoutInfo(
    first_name: string,
    last_name: string,
    zip_code: string
  ) {
    await this.firstName.fill(first_name);
    await this.lastName.fill(last_name);
    await this.zipCode.fill(zip_code);
  }
  async assertCheckoutInfo() {
    await expect(this.page).toHaveURL(
      "https://www.saucedemo.com/checkout-step-two.html"
    );
  }
  async clickOnCancel() {
    await this.cancelCheckout.click();
  }
  async assertCancel() {
    await expect(this.page).toHaveURL("https://www.saucedemo.com/cart.html");
  }
  async SumOfPrices() {
    const prices = await this.page.$$eval(
      "div.inventory_item_price",
      (prices) => {
        return prices.map((price) => {
          const tempPrice = price.textContent;
          const formatedPrice = (el) => el.replace("$", "");
          return formatedPrice(tempPrice);
        });
      }
    );
    const formatedPrices = prices.map(Number);

    const total = formatedPrices.reduce((a, b) => {
      return a + b;
    });
    calcTotal += total;
  }
  async calculateTotal() {
    const TaxValue = (await this.tax.innerText()).valueOf();
    const tempTax = TaxValue.replace("Tax: $", "");
    const formatedTax = Number(tempTax);

    calcTotal += formatedTax;
  }
  async validateTotal() {
    const summaryTValue = (await this.summaryTotal.innerText()).valueOf();
    const tempST = summaryTValue.replace("Total: $", "");
    const formatedST = Number(tempST);
    console.log(
      "summary total is: " +
        formatedST +
        " and calculated total is: " +
        calcTotal
    );
    await expect(calcTotal).toEqual(formatedST);
  }
  async clickOnFinish(){
    await this.finishBtn.click();
  }
  async assertFinish(){
    await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
    await expect(this.completedHeader).toContainText('THANK YOU FOR YOUR ORDER');
  }
}
