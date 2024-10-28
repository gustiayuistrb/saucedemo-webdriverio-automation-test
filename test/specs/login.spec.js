import { browser, expect } from '@wdio/globals';
import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';

describe('Login Feature', function() {
    it('Logged in with valid username and password', async () => {
        await loginPage.openPage()
        await loginPage.loginProcess('standard_user', 'secret_sauce');
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')
        expect(inventoryPage.pageTitle).toHaveText('Products');
    });

    it('Attempt to log in with an incorrect password while using a valid username.', async () => {
        await loginPage.openPage()
        await loginPage.loginProcess('standard_user', 'wrong_sauce');
        await expect(loginPage.errorMessage).toHaveText(
            expect.stringContaining('Username and password do not match')
        )
    });

    it('Attempt to log in with an incorrect username while using a valid password.', async () => {
        await loginPage.openPage()
        await loginPage.loginProcess('wrong_user', 'secret_sauce');
        await expect(loginPage.errorMessage).toHaveText(
            expect.stringContaining('Username and password do not match')
        )
    });

    it('Attempt to log in without entering a username.', async () => {
        await loginPage.openPage()
        await loginPage.loginProcess('', 'secret_sauce');
        await expect(loginPage.errorMessage).toHaveText(
            expect.stringContaining('Username is required')
        )
    });

    it('Attempt to log in without entering a password.', async () => {
        await loginPage.openPage()
        await loginPage.loginProcess('standard_user', '');
        await expect(loginPage.errorMessage).toHaveText(
            expect.stringContaining('Password is required')
        )
    });

    it('Attempt to log in with an empty field.', async () => {
        await loginPage.openPage()
        await loginPage.loginProcess('', '');
        await expect(loginPage.errorMessage).toHaveText(
            expect.stringContaining('Username is required')
        )
    });

    it('Attempt to log in with an incorrect username and password.', async () => {
        await loginPage.openPage()
        await loginPage.loginProcess('invalid_user', 'wrong_password');
        await expect(loginPage.errorMessage).toHaveText(
            expect.stringContaining('Username and password do not match')
        )
    });

});
