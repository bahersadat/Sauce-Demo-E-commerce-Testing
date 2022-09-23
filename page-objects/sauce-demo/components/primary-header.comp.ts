import { Locator, Page } from "@playwright/test";

export class HeaderComponents {
  readonly page: Page;
  readonly menu: Locator;
  readonly cartLink: Locator;
  readonly menuNavBar: Locator;
  readonly about: Locator;
  readonly logout: Locator;
  readonly resetAppState: Locator;
  readonly allItems: Locator;
  readonly cartBadge:Locator;

  constructor(page: Page) {
    this.page = page;
    this.menu = page.locator("#react-burger-menu-btn");
    this.cartLink = page.locator("#shopping_cart_container");
    this.menuNavBar = page.locator(".bm-item-list");
    this.about = page.locator("#about_sidebar_link");
    this.logout = page.locator("#logout_sidebar_link");
    this.resetAppState = page.locator("#reset_sidebar_link");
    this.allItems = page.locator("#inventory_sidebar_link");
    this.cartBadge = page.locator('span.shopping_cart_badge');
  }
}
