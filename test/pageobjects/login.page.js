import { $, browser } from '@wdio/globals'

class LoginPage{
    get usernameInput() { return $('#user-name') }
    get passwordInput() { return $('#password') }
    get submitButton() { return $('#login-button') }
    get errorMessage() { return $('h3[data-test="error"]')}

    async loginProcess (username, password){
        await this.usernameInput.setValue(username)
        await this.passwordInput.setValue(password)
        await this.submitButton.click()
    }

    async openPage(){
        await browser.url('https://www.saucedemo.com/')
    }

    async setUserCookie() {
        await super.setUserCookie();
    }
}

export default new LoginPage()