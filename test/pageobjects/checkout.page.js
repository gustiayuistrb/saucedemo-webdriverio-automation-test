class checkoutPage {
    get checkoutButton() { return $('#checkout'); }
    get firstNameInput() { return $('#first-name'); }
    get lastNameInput() { return $('#last-name'); }
    get postalCodeInput() { return $('#postal-code'); }
    get continueButton() { return $('#continue'); }
    get finishButton() { return $('#finish')}
    get completeHeader() { return $('.complete-header'); }
    get errorMessage() { return $('h3[data-test="error"]'); }

    async fillCheckoutInfo(firstName, lastName, postalCode) {
        await this.firstNameInput.setValue(firstName);
        await this.lastNameInput.setValue(lastName);
        await this.postalCodeInput.setValue(postalCode);
    }

    async clickCheckout() {
        await this.checkoutButton.click();
    }

    async clickContinue() {
        await this.continueButton.click();
    }

    async clickFinish() {
        await this.finishButton.click();
    }

    async getCompleteHeader() {
        return await this.completeHeader.getText();
    }

    async getErrorMessage() {
        return await this.errorMessage.getText();
    }
}

export default new checkoutPage();
