import { Page } from "@playwright/test";

export class BasePage{
    readonly page: Page;

    constructor(page:Page){
        this.page = page;
    }

    async baseUrl(url){
        return this.page.goto(`https://www.saucedemo.com/${url}`);
    }
}