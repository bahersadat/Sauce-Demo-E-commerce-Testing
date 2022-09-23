import { expect, Locator, Page } from "@playwright/test";
import { SecondaryHeader } from '../../page-objects/sauce-demo/components/secondary-header.comp';
import { HeaderComponents } from "../../page-objects/sauce-demo/components/primary-header.comp";

export class SingleProductPage {
    // Pages and Components
  readonly page: Page;
  readonly secondaryHeaderComponents: SecondaryHeader;
  readonly headerComponents:HeaderComponents;

  // Selectors
  readonly image: Locator;
  readonly productDetailsContainer: Locator;
  readonly addToCartBtn: Locator;
  readonly removeBtn : Locator;

  constructor(page: Page) {
    // Pages and components
    this.page = page;
    this.secondaryHeaderComponents = new SecondaryHeader(page);
    this.headerComponents = new HeaderComponents(page);

    // Selectors
    this.image = page.locator("img.inventory_details_img");
    this.productDetailsContainer = page.locator(
      "div.inventory_details_desc_container"
    );
    this.addToCartBtn = page.locator('//button[text()="Add to cart"]');
    this.removeBtn = page.locator('//button[text()="Remove"]');
  }

  async clickOnProduct(productName) {
    await this.page.locator(`text=${productName}`).click();
  }
  async assertSProductImg() {
    await expect(this.image).toBeVisible();
  }
  async assertSProductDetails() {
    await expect(this.productDetailsContainer).toHaveCount(1);
  }
  async clickAddToCart(){
    await this.addToCartBtn.click();
  }
  async assertNumberOfAddedProducts(numberOfAddedProductsToTheCart){
    await expect(this.headerComponents.cartBadge).toContainText(numberOfAddedProductsToTheCart);
  }
  async clickOnRemoveBtn() {
    await this.removeBtn.click();
  }
  async assertRemoveBtn() {
    await expect(this.addToCartBtn).toBeVisible();
  }
  async clickOnBackToProductsBtn() {
    await this.secondaryHeaderComponents.backToProducts.click();
  }
  async assertBackToProductsBtn(){
    await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
  }

}
