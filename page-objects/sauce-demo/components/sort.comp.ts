import { Locator, Page } from "@playwright/test";

export class SortComponents{
    readonly page: Page;
    readonly productSort: Locator;


    constructor(page:Page) {
        this.page = page;
        this.productSort = page.locator('.product_sort_container');
    }
}