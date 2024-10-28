import { expect, $, browser } from "@wdio/globals";
import loginPage from "../pageobjects/login.page.js";
import inventoryPage from "../pageobjects/inventory.page.js";

describe("Inventory Page", () => {
  before(async () => {
    await loginPage.openPage()
    await loginPage.loginProcess("standard_user", "secret_sauce");
  });

  describe("Verify Sorting works as intended", () => {
    it("Sort by Name (A -> Z)", async () => {
      await inventoryPage.selectSortOption(inventoryPage.AtoZOption);
      await browser.pause(500);

      const originalItemNames = await inventoryPage.getProductNames();
      const sortedItemNames = [...originalItemNames].sort();

      expect(originalItemNames).toEqual(sortedItemNames);
    });

    it("Sort by Name (Z -> A)", async () => {
      await inventoryPage.selectSortOption(inventoryPage.ZtoAOption);
      await browser.pause(500);

      const originalItemNames = await inventoryPage.getProductNames();
      const sortedItemNames = [...originalItemNames].sort((a, b) => b.localeCompare(a));

      expect(originalItemNames).toEqual(sortedItemNames);
    });

    it('Sort by Price (Low to High)', async () => {
      await inventoryPage.selectSortOption(inventoryPage.priceLowToHighOption);
      await browser.pause(500);
      const originalItemPrices = await inventoryPage.getProductPrices();
      const sortedItemPrices = [...originalItemPrices].sort((a, b) => a - b); // Sort ascending
      expect(originalItemPrices).toEqual(sortedItemPrices);
    });

    it('Sort by Price (High to Low)', async () => {
      await inventoryPage.selectSortOption(inventoryPage.priceHighToLowOption);
      await browser.pause(500);  
      const originalItemPrices = await inventoryPage.getProductPrices();
      const sortedItemPrices = [...originalItemPrices].sort((a, b) => b - a); // Sort descending
      expect(originalItemPrices).toEqual(sortedItemPrices);
    });
  });
  
  describe('Verify Navigation Menu Functionality', () => {
    beforeEach(async () => {
      await loginPage.openPage()
      await loginPage.loginProcess('standard_user', 'secret_sauce'); 
      await inventoryPage.navMenu.click();
      await inventoryPage.isNavMenuVisible();
    });

    it('Redirection to Inventory Page after clicking "All Items"', async () => {
      await inventoryPage.clickAllItems();
      expect(await browser.getUrl()).toContain('inventory.html');
    });

    it('Redirection to Sauce Labs Page after clicking "About"', async () => {
      const previousUrl = await browser.getUrl(); 
      await inventoryPage.clickAbout();
      await browser.pause(2000);
      expect(await browser.getUrl()).toBe('https://saucelabs.com/'); 
      await browser.back();
      await browser.pause(2000); 
      expect(await browser.getUrl()).toContain(previousUrl);
    });

    it("Ensure that clicking 'Reset App State' resets the application state", async () => {
      await inventoryPage.clickResetAppState();
      const cartBadge = await $('.shopping_cart_badge');
      const badgeText = await cartBadge.getText();
      expect(badgeText).toBe('');
    });

    it('Redirection to Login Page after clicking "Logout"', async () => {      
      await inventoryPage.clickLogout();
      await browser.pause(2000);
      const currentUrl = await browser.getUrl();
      expect(currentUrl).toContain('https://www.saucedemo.com/');    
    });
  });
  
});
