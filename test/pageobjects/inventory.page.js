import { $, browser } from '@wdio/globals'


class InventoryPage {
    get pageTitle() { return $('span[data-test="title"]'); }

    get sortDropdown() { return $('select.product_sort_container'); }
    get AtoZOption() { return "Name (A to Z)"; }
    get ZtoAOption() { return "Name (Z to A)"; }
    get priceLowToHighOption() { return "Price (low to high)"; }
    get priceHighToLowOption() { return "Price (high to low)"; }

    get productNames() { return $$('.inventory_item_name'); }
    get productPrices() { return $$('.inventory_item_price'); }

    get navMenu() { return $('#react-burger-menu-btn'); }
    get allItemsLink() { return $('#inventory_sidebar_link'); } 
    get aboutLink() { return $('#about_sidebar_link'); }
    get logoutLink() { return $('#logout_sidebar_link'); } 
    get resetAppStateLink() { return $('#reset_sidebar_link'); }
    get closeButton() { return $('#react-burger-cross-btn'); } 
    

    async openPage(){
        await browser.url('inventory.html')
    }
    async selectSortOption(option) {
        await this.sortDropdown.selectByVisibleText(option);
    }

    async getProductNames() {
        const names = [];
        const products = await this.productNames;
        for (const product of products) {
          names.push(await product.getText());
        }
        return names;
    }

    async getProductPrices() {
        const priceElements = await this.productPrices
        const prices = [];
        for (const priceElement of priceElements) {
            const priceText = await priceElement.getText();
            const price = parseFloat(priceText.replace('$', ''));
            prices.push(price); 
        }
        return prices; 
      }
      
    //navigation menu
    async isNavMenuVisible() {
        await this.navMenu.waitForDisplayed(); 
    }

    async clickAllItems() {
        await this.allItemsLink.click();
    }

    async clickAbout() {
        await this.aboutLink.click();
    }

    async clickLogout() {
        await this.logoutLink.click();
    }

    async clickResetAppState() {
        await this.resetAppStateLink.click(); 
    }

    async clickCloseMenu() {
        await this.closeButton.click();
    }
}

export default new InventoryPage();
