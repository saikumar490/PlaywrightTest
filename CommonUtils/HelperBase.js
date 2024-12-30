const { test, expect } = require('@playwright/test');


class HelperBase
{ 

  async ClickOnElement(page, ElementLocator) {
    try {
      // Wait for the element to be visible before clicking
      await page.locator(ElementLocator).waitFor({ state: 'visible' });
      await page.locator(ElementLocator).click();
      console.log(`Clicked on element with locator: ${ElementLocator}`);
    } catch (error) {
      console.error(`Failed to click on element with locator: ${ElementLocator}`, error);
      throw error;  // Re-throw the error if you want the test to fail
    }
  }

  async  ClickOnRadioButton(page, ElementLocator) {
    try {
      // Wait for the radio button to be visible before interacting
      const radioButton = page.locator(ElementLocator);
      
      // Ensure the radio button is visible and not already selected
      await radioButton.waitFor({ state: 'visible' });
      
      // Check if the radio button is not already selected before clicking
      const isSelected = await radioButton.isChecked();
      if (!isSelected) {
        await radioButton.click();
        console.log(`Radio button with locator: ${ElementLocator} has been selected.`);
      } else {
        console.log(`Radio button with locator: ${ElementLocator} is already selected.`);
      }
    } catch (error) {
      console.error(`Failed to interact with radio button with locator: ${ElementLocator}`, error);
      throw error; // Re-throw the error if you want the test to fail
    }
  }

  async  ClickOnCheckbox(page, ElementLocator) {
    try {
      // Wait for the checkbox to be visible before interacting
      const checkbox = page.locator(ElementLocator);
  
      // Ensure the checkbox is visible
      await checkbox.waitFor({ state: 'visible' });
  
      // Check if the checkbox is checked or not
      const isChecked = await checkbox.isChecked();
  
      if (!isChecked) {
        // If not checked, click to check it
        await checkbox.click();
        console.log(`Checkbox with locator: ${ElementLocator} has been checked.`);
      } else {
        // If already checked, log the status
        console.log(`Checkbox with locator: ${ElementLocator} is already checked.`);
      }
    } catch (error) {
      console.error(`Failed to interact with checkbox with locator: ${ElementLocator}`, error);
      throw error; // Re-throw the error if you want the test to fail
    }
  }
//Static Dropdown
  async  SelectOptionFromDropdown(page, ElementLocator, optionValue) {
    try {
      // Wait for the dropdown to be visible before interacting with it
      const dropdown = page.locator(ElementLocator);
      
      // Wait for the dropdown to be attached to the DOM and visible
      await dropdown.waitFor({ state: 'visible' });
  
      // Select an option from the dropdown using the option's value, label, or index
      await dropdown.selectOption({ label: optionValue });
      console.log(`Option with label "${optionValue}" has been selected in the dropdown.`);
    } catch (error) {
      console.error(`Failed to select option with value "${optionValue}" in dropdown with locator: ${ElementLocator}`, error);
      throw error; // Re-throw the error to fail the test if necessary
    }
  }
//Dynamic Dropdown
// helper.js or utils.js (or any shared utility file)
async  selectFromAutocomplete(page, inputLocator, searchText, optionTextLocator) {
    try {
      // Fill the input field with the provided search text
      await page.locator(inputLocator).fill(searchText);
  
      // Wait for the suggestion dropdown to appear
      await page.waitForSelector(optionTextLocator, { state: 'visible' });
  
      // Get all suggestion elements
      const suggestions = await page.$$(optionTextLocator);
  
      // Iterate over the suggestions and click the correct one
      for (let suggestion of suggestions) {
        const suggestionText = await suggestion.textContent(); // Get text content of each suggestion
  
        // If the suggestion contains the expected text, click it and break out of the loop
        if (suggestionText.trim().includes(searchText)) {
          await suggestion.click();
          break;
        }
      }
  
      // Optionally, wait for some follow-up action or page transition after selection
      // await page.waitForSelector('selector-for-next-element');
      
    } catch (error) {
      console.error(`Failed to select option for search text "${searchText}"`, error);
      throw error; // Rethrow the error to ensure the test fails properly
    }
  }
  
// reusableHelpers.js
async  handleAlert(page, alertTriggerLocator, expectedAlertMessage, action = 'accept') {
    // Listen for alert dialog events
    page.on('dialog', async (dialog) => {
      console.log(`Alert Message: ${dialog.message()}`);
      
      // Verify that the alert message is as expected
      if (dialog.message() !== expectedAlertMessage) {
        throw new Error(`Unexpected alert message: ${dialog.message()}`);
      }
  
      // Take action based on the parameter ('accept' or 'dismiss')
      if (action === 'accept') {
        await dialog.accept();  // Click "OK"
      } else {
        await dialog.dismiss(); // Click "Cancel"
      }
    });
  
    // Ensure the element exists before clicking
    const alertTrigger = await page.locator(alertTriggerLocator);
    if (await alertTrigger.isVisible()) {
      // Click the element to trigger the alert
      await alertTrigger.click();
    } else {
      throw new Error(`Element with locator ${alertTriggerLocator} not found or not visible.`);
    }
  }

  async  DismisshandleAlert(page, alertTriggerLocator, expectedAlertMessage, action = 'dismiss') {
    // Listen for alert dialog events
    page.on('dialog', async (dialog) => {
      console.log(`Alert Message: ${dialog.message()}`);
      
      // Verify that the alert message is as expected
      if (dialog.message() !== expectedAlertMessage) {
        throw new Error(`Unexpected alert message: ${dialog.message()}`);
      }
  
      // Take action based on the parameter ('accept' or 'dismiss')
      if (action === 'dismiss') {
        await dialog.accept();  // Click "OK"
      } else {
        await dialog.dismiss(); // Click "Cancel"
      }
    });
  
    // Ensure the element exists before clicking
    const alertTrigger = await page.locator(alertTriggerLocator);
    if (await alertTrigger.isVisible()) {
      // Click the element to trigger the alert
      await alertTrigger.click();
    } else {
      throw new Error(`Element with locator ${alertTriggerLocator} not found or not visible.`);
    }
  }

  // reusableHelpers.js
async  mouseOverElement(page, locator) {
    const element = page.locator(locator);
  
    // Ensure the element is visible before hovering over it
    if (await element.isVisible()) {
      await element.hover();  // Hover over the element
      console.log(`Hovered over element: ${locator}`);
    } else {
      throw new Error(`Element with locator ${locator} not visible.`);
    }
  }
  
  


  // reusableHelpers.js
async  selectDateFromCalendarWithNavigation(page, calendarBtnLocator, monthYearLocator, dateLocator, targetMonth, targetYear) {
    const calendarBtn = page.locator(calendarBtnLocator);
    const monthYear = page.locator(monthYearLocator);
    const date = page.locator(dateLocator);
  
    // Open the calendar
    await calendarBtn.click();
    
    // Wait for the calendar to open
    await page.waitForSelector(monthYearLocator);
    
    // Navigate to the target month/year
    let currentMonthYear = await monthYear.innerText();
    while (!currentMonthYear.includes(targetMonth) || !currentMonthYear.includes(targetYear)) {
      await page.locator('button.next-month').click(); // Click next month button
      currentMonthYear = await monthYear.innerText();
    }
  
    // Select the target date
    await date.click();
    console.log(`Selected date from calendar: ${await date.textContent()}`);
  }
  
 
  
// utils/fileHelper.js

async  uploadFile(page, inputLocator, filePath) {
    try {
      // Locate the file input element
      const fileInput = page.locator(inputLocator);
      
      // Set the file path for the file input
      await fileInput.setInputFiles(filePath);
  
      console.log(`File uploaded successfully from path: ${filePath}`);
    } catch (error) {
      console.error(`Failed to upload file from path: ${filePath}`, error);
      throw error; // Re-throw to fail the test
    }
  }
  
// utils/screenshotHelper.js


async  takeScreenshot(page, screenshotType, text = null, locator = null, screenshotPath) {
    try {
      let elementLocator;
  
      // Handle the screenshot based on the type
      if (screenshotType === 'fullpage') {
        // For full page screenshot
        await page.screenshot({ path: screenshotPath, fullPage: true });
        console.log(`Full-page screenshot saved to: ${screenshotPath}`);
      } else if (screenshotType === 'element') {
        // Locate element by text or locator
        if (text) {
          // Use XPath to locate by text if text is provided
          elementLocator = page.locator(`//*[contains(text(),'${text}')]`);
        } else if (locator) {
          // Otherwise, use the locator if provided
          elementLocator = page.locator(locator);
        } else {
          throw new Error('You must provide either text or a locator for the element screenshot.');
        }
  
        // Wait for the element to be visible before taking the screenshot
        await elementLocator.waitFor({ state: 'visible', timeout: 5000 });
        await elementLocator.screenshot({ path: screenshotPath });
        console.log(`Screenshot of element saved to: ${screenshotPath}`);
      } else {
        throw new Error('Invalid screenshotType. Please provide either "fullpage" or "element".');
      }
  
    } catch (error) {
      console.error(`Failed to take screenshot: ${error.message}`);
      throw error; // Re-throw to fail the test if an error occurs
    }
  }


}
module.exports = { HelperBase };

  
  

  
  

  