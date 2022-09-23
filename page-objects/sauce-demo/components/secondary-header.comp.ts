import { expect, Locator, Page } from "@playwright/test";

export class SecondaryHeader {
  readonly page: Page;
  readonly backToProducts: Locator;

  constructor(page: Page) {
    this.page = page;
    this.backToProducts = page.locator('#back-to-products');
  }
}
