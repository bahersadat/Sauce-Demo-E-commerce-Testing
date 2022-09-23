import { test, expect } from "@playwright/test";
import { LoginPage } from "../../page-objects/sauce-demo/login.page";

test.describe('Sauce Demo E-Commerce Login Tests', () => {
    // declaring variables for Page Objects
    let loginPage: LoginPage;

    test.beforeEach(async ({page}) => {
        // initializing variables
        loginPage = new LoginPage(page);

        // essential functions before each test
        await loginPage.visit();

    })

    test('Login - without username and password + asserting error', async () => {
        await loginPage.login("", "");
        await loginPage.assertErrUserNameRequired();
    });

    test('Login - with only Valid username + asserting error', async () => {
        await loginPage.login('standard_user', '');
        await loginPage.assertErrPasswordRequired();
        
    });
    test('Login - with only invalid username + asserting error', async () => {
        await loginPage.login('some_username', '');
        await loginPage.assertErrPasswordRequired();
        
    });
    test('Login - with invalid credentials + asserting error', async () => {
        await loginPage.login("invalidusername", "invalidPassword");
        await loginPage.assertErrInvalidCredentials();
    });
    test('Login - with Valid credentials', async () => {
        await loginPage.login(loginPage.validUsername, loginPage.validPassword);
        await loginPage.assertSuccessfulLogin();
    });
    


});