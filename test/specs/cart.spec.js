import { expect } from '@wdio/globals';
import cartPage from '../pageobjects/cart.page.js';
import loginPage from "../pageobjects/login.page.js";
import inventoryPage from '../pageobjects/inventory.page.js';

describe('Add to Cart Functionality', function() {
    beforeEach(async () => {
        await loginPage.openPage();
        await loginPage.loginProcess('standard_user', 'secret_sauce'); 
    });

    it('Add item to cart on product detail page', async () => {
        await inventoryPage.clickProduct('Sauce Labs Backpack'); 
        await productDetailPage.clickAddToCart();
        const cartBadge = await $('.shopping_cart_badge');
        const badgeText = await cartBadge.getText();
        expect(badgeText).toBe('1'); 
    });

    it('should verify if badge 1 is added to cart after clicking "Add to cart"', async() => {
        await cartPage.clickAddToCartButton();
        await expect(cartPage.cartBadge).toHaveText('1');
    });

    it('should verify if the "Add to cart" button has changed to "Remove" after clicking it', async() => {
        await cartPage.clickAddToCartButton();
        await cartPage.addToCartBackpackButton.waitForDisplayed({ reverse: true });
        const removeButtonText = await cartPage.removeBackpackButton;
        await expect(removeButtonText).toHaveText('Remove');
    });

    it('should verify if badge 1 is removed from cart after clicking "Remove" button', async() => {
        await cartPage.clickAddToCartButton();
        await cartPage.addToCartBackpackButton.waitForDisplayed({ reverse: true });
        await cartPage.clickRemoveFromCartButton();
        await expect(cartPage.cartBadge).not.toBeDisplayed();
    });
});
