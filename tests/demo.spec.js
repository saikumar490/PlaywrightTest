// @ts-check
const { test, expect, chromium } = require('@playwright/test');
const {loginpage} = require('../Pages/LoginPage');
const {urls} = require('../Support/Constants.js'); 

let login;

test.beforeEach(async ({ page }) => {
    // Initialize the Loginpage class before each test
    // const browser = await chromium.launch();
    // const context = await browser.newContext();
    login = new loginpage(page);
    login.launchtheurl();
    
   
})

test('firstlogin', async ({ page }) => {
        
        await login.loginintoapplications();
        
    });
