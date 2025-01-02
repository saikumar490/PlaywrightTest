// @ts-check
const { test, expect, chromium } = require('@playwright/test');
const {urls, locators } = require('../Support/Constants.js'); 
const{HelperBase} = require('../CommonUtils/HelperBase.js')
//require('../Support/CommonHooks.js')


test.only('has title', async ({ page, browser }) => {
 let helperbase = new HelperBase();
const context = await browser.newContext();
// const page1 = await context.newPage();
await page.goto("https://jqueryui.com/datepicker/"); 
await page.locator(locators.ele).click();
// await page.waitForLoadState('networkidle');
// await page.waitForSelector('#dynamic-content'), { retries: 3}); 
// await page.waitForTimeout(5000);
// await page.locator('iframe').contentFrame().locator('#datepicker').click();
// const pagepromise = context.waitForEvent('page');
// await page1.locator('(//a[@target="_blank"])[2]').click();
// const newpage = await pagepromise;
// await expect(newpage).toHaveTitle('QAClick Academy - A Testing Academy to Learn, Earn and Shine')
// await newpage.close();
// helperbase.ClickOnRadioButton(page, '(//input[@class="radioButton"])[1]')
// helperbase.selectFromAutocomplete(page,'//input[@id="autocomplete"]','American Samoa','//div[@class="ui-menu-item-wrapper"]')
// helperbase.SelectOptionFromDropdown(page, '//select[@id="dropdown-class-example"]', 'Option2')
// helperbase.ClickOnCheckbox(page, '//input[@id="checkBoxOption1"]');
// helperbase.handleAlert(page, '//input[@id="alertbtn"]', 'Hello , share this practice page and share your knowledge','accept')
// helperbase.mouseOverElement(page, '//button[@id="mousehover"]');
// await page.waitForTimeout(6000);
// helperbase.insidemouseOverElement(page, '//div[@class="mouse-hover"]//a[@href="#top"]');
// helperbase.selectDateFromCalendarWithNavigation(page,'//span[@class="ui-datepicker-month"]','//span[@class="ui-datepicker-year"]','//a[@href="#"]','November','2023','7' )


});
