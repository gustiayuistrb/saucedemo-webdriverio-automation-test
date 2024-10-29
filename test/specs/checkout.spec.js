import { $, expect, browser } from '@wdio/globals'
import loginPage from '../pageobjects/login.page'
import checkoutPage from '../pageobjects/checkout.page'
import cartPage from '../pageobjects/cart.page'

describe('Checkout functionality', function(){
    beforeEach(async () => {
        await loginPage.openPage();
        await loginPage.loginProcess('standard_user', 'secret_sauce');
    })

    it.only('Proceed to checkout with valid data', async function (){
        await cartPage.clickAddToCart();
        await cartPage.clickShoppingCart();
        await checkoutPage.clickCheckout();
        await checkoutPage.fillCheckoutInfo('Gusti', 'Ayu', '60113');
        await checkoutPage.clickContinue();
        await checkoutPage.clickFinish();
        const checkoutCompleteText = await checkoutPage.getCompleteHeader();
        expect(checkoutCompleteText).toHaveText("Thank you for your order!")
    })

    it('Not filling any fields', async () => {
        await cartPage.clickAddToCart(); 
        await cartPage.clickShoppingCart();
        await checkoutPage.clickCheckout();
        await checkoutPage.fillCheckoutInfo('', '', '');
        await checkoutPage.clickContinue();
        const errorMessage = await checkoutPage.getErrorMessage();
        expect(errorMessage).toHaveText('Error: First Name is required');
    });

    it('Not filling out the first name', async () => {
        await cartPage.clickAddToCart(); 
        await cartPage.clickShoppingCart();
        await checkoutPage.clickCheckout();
        await checkoutPage.fillCheckoutInfo('', 'Ayu', '60113');
        await checkoutPage.clickContinue();
        const errorMessage = await checkoutPage.getErrorMessage();
        expect(errorMessage).toBe('Error: First Name is required');
    });

    it('Not filling out the last name', async () => {
        await cartPage.clickAddToCart(); 
        await cartPage.clickShoppingCart();
        await checkoutPage.clickCheckout();
        await checkoutPage.fillCheckoutInfo('Gusti', '', '60113');
        await checkoutPage.clickContinue();
        const errorMessage = await checkoutPage.getErrorMessage();
        expect(errorMessage).toBe('Error: Last Name is required');
    });

    it('Not filling out the postal code', async () => {
        await cartPage.clickAddToCart(); 
        await cartPage.clickShoppingCart();
        await checkoutPage.clickCheckout();
        await checkoutPage.fillCheckoutInfo('Gusti', 'Ayu', '');
        await checkoutPage.clickContinue();
        const errorMessage = await checkoutPage.getErrorMessage();
        expect(errorMessage).toBe('Error: Postal Code is required');
    });

    it('First name is invalid (numbers)', async () => {
        await cartPage.clickAddToCart(); 
        await cartPage.clickShoppingCart();
        await checkoutPage.clickCheckout();
        await checkoutPage.fillCheckoutInfo('12345', 'Ayu', '60113');
        await checkoutPage.clickContinue();
        const errorMessage = await checkoutPage.getErrorMessage();
        expect(errorMessage).toBe('Error: First Name is invalid');
    });

    it('Last name is invalid (numbers)', async () => {
        await cartPage.clickAddToCart(); 
        await cartPage.clickShoppingCart();
        await checkoutPage.clickCheckout();
        await checkoutPage.fillCheckoutInfo('Gusti', '12345', '60113');
        await checkoutPage.clickContinue();
        const errorMessage = await checkoutPage.getErrorMessage();
        expect(errorMessage).toBe('Error: Last Name is invalid');
    });

    it('Postal code is invalid (letters)', async () => {
        await cartPage.clickAddToCart(); 
        await cartPage.clickShoppingCart();
        await checkoutPage.clickCheckout();
        await checkoutPage.fillCheckoutInfo('Gusti', 'Ayu', 'kodepos');
        await checkoutPage.clickContinue();
        const errorMessage = await checkoutPage.getErrorMessage();
        expect(errorMessage).toBe('Error: Postal Code is invalid');
    });

    it('Checkout the empty cart', async () => {
        await cartPage.clickShoppingCart();
        const checkoutButtonExists = await checkoutPage.checkoutButton.isDisplayed();
        expect(checkoutButtonExists).toBe(false); 
    });
})