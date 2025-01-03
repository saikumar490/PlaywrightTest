const { test, expect } = require('@playwright/test');
const {urls, locators } = require('../Support/Constants.js'); 
const { HelperBase } = require('../CommonUtils/HelperBase.js');
const { chromium } = require('playwright');
const testdata = require('../TestData/testdata.json');
//const testData = JSON.parse(fs.readFileSync(testDataPath, 'utf-8'));


class loginpage{

    constructor(page) {
        this.page = page
        this.login='#login2'
        this.usernameinput='//input[@id="loginusername"]'
        this.passwordinput='//input[@id="loginpassword"]'
        this.loginbutton='(//*[contains(text(),"Log in")])[2]'
        this.logoutbutton='#logout2'
        this.helper = new HelperBase();
     // Initialize HelperBase class
      }

    async launchtheurl(){

        const browser = await chromium.launch();  // Make sure browser is launched
        const context = await browser.newContext();
        await this.page.goto(urls.AdminUrl, { waitUntil: 'load' });

    }

    async loginintoapplications(){

        await this.helper.ClickOnElement(this.page, this.login);
        await this.helper.EnterTextIntoField(this.page, this.usernameinput, testdata[0].usernames)

    }

}

module.exports = {loginpage};