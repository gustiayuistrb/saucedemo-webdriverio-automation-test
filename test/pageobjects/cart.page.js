import { $, browser, expect } from '@wdio/globals'

class cartPage {
    get addToCartButton() { return $('#add-to-cart-sauce-labs-backpack'); }
    get removeFromCartButton() { return $('#remove-sauce-labs-backpack'); }
    get cartBadge() { return $('.shopping_cart_badge'); }
    get shoppingCartLink() { return $('.shopping_cart_link'); }
    get cartItem() { return $('.cart_item'); }
    get productNames() { return $$('.inventory_item_name'); }
    get productImage() { return $('.inventory_details_img'); }
    get productDescription() { return $('.inventory_details_desc'); }
    
  
    async clickAddToCart() {
      await this.addToCartButton.click();
    }
  
    async clickRemoveFromCart() {
      await this.removeFromCartButton.click();
    }
    
    async clickProduct(productNames) {
        const productLink = await $(`//div[text()="${productNames}"]`);
        await productLink.click();
    }

    async clickRemoveFromCart(productNames) {
        const removeButton = await $(`//div[text()="${productNames}"]/following-sibling::button[contains(text(), 'Remove')]`);
        await removeButton.click();
    }

    async clickShoppingCart() {
        await shoppingCartLink.click();
    }

    async cleanCartContent() {
        await super.cleanLocalStorage('cart-contents');
    }

    async getProductDetails() {
        const name = await this.productName.getText();
        const price = await this.productPrice.getText();
        const imageSrc = await this.productImage.getAttribute('src');
        return { name, price, imageSrc };
    }
    async getProductTitle(index) {
        const product = await this.productNames[index];
        return await product.getText(); 
    }

    async clickProduct(index) {
        const product = await this.productNames[index];
        await product.click();
    }


}

export default new cartPage();
