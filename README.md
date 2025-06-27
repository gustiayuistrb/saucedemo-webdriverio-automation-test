# saucedemo-webdriverio-automation-test

This project contains automated tests using WebDriverIO for testing the **Sauce Demo** website. 

## Prerequisites

To get started, you will need to have the following software installed:

- [Node.js](https://nodejs.org/en/) (v14 or above)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [WebDriverIO](https://webdriver.io/) (Test automation framework)
- A Sauce Labs account (optional for cloud testing)

## Installation

Follow the steps below to set up the testing environment:

### Step 1: Clone this repository

```
git clone https://github.com/yourusername/webdriverio-saucedemo-testing.git
cd webdriverio-saucedemo-testing
```
### Step 2: Install dependencies
Install the necessary npm packages:

```
npm install
```
This will install WebDriverIO and other necessary packages defined in package.json.

### Running Tests
You can run the tests locally or using a cloud provider like Sauce Labs.

Option 1: Run tests locally
```
npx wdio run wdio.conf.js
```
This will start the tests locally in your default browser (usually Chrome).
Running a specific test file:
To run a specific test file, use the following command:
```
npx wdio run wdio.conf.js --spec ./test/specs/login.spec.js
```
### Writing Tests
Test scripts are located in the /tests directory. 


