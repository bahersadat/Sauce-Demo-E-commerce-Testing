import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./Base.page";
import { HeaderComponents } from "./components/primary-header.comp";
import { SortComponents } from "./components/sort.comp";

export class MainShopPage extends BasePage {
  // pages and components
  readonly sortComponents: SortComponents;
  readonly headerComponents:HeaderComponents;

  // selectors
  readonly itemNamesSelector: Locator;
  readonly ProductLinkSel:Locator;
  

  constructor(page: Page) {
    super(page);
    // pages and components
    this.headerComponents = new HeaderComponents(page);
    this.sortComponents = new SortComponents(page);

    // selectors
    this.itemNamesSelector = page.locator(".inventory_item_name");
    this.ProductLinkSel = page.locator('div[class="inventory_details_name large_size"]');

  }
  async addToCart(name:string){
    const addToCartBtn = this.page.locator(`//div[text()="${name}"]/../../following-sibling::div[@class="pricebar"]/button[text()="Add to cart"]`);
    await addToCartBtn.click();
  }
  async assertNumberOfAddedProducts(numberOfAddedProductsToTheCart){
    await expect(this.headerComponents.cartBadge).toContainText(numberOfAddedProductsToTheCart);
  }
  async sort(value){
    await this.sortComponents.productSort.selectOption(value);
  }
  async clickOnProduct(productName){
    await this.page.locator(`text=${productName}`).click();
  }
  async assertProductLink(){
    await expect(this.ProductLinkSel).toBeVisible();
  }
  async clickOnMenuComp(){
    await this.headerComponents.menu.click();
  }
  async assertMenuComp(){
    await expect(this.headerComponents.menuNavBar).toBeVisible();
  }
  async clickOnAboutComp(){
    await this.headerComponents.about.click();
  }
  async assertAboutComp(){
    await expect(this.page).toHaveURL('https://saucelabs.com/');
  }
  async clickOnLogoutComp() {
    await this.headerComponents.logout.click();
  }
  async assertLogoutComp(){
    await expect(this.page).toHaveURL('https://www.saucedemo.com/');
  }
  async clickOnResetComp(){
    await this.headerComponents.resetAppState.click();
  }
  async assertResetComp(){
    await expect(this.headerComponents.cartBadge).not.toBeVisible();
  }
  async clickOnAllItemsComp(){
    await this.headerComponents.allItems.click();
  }
  async assertAllItemsComp(){
    await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
  }
  async clickOnCartComp(){
    await this.headerComponents.cartLink.click();
  }
  async assertCartComp(){
    await expect(this.page).toHaveURL('https://www.saucedemo.com/cart.html');
  }
  
  
}
