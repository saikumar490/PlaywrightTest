const { test, expect } = require('@playwright/test');
const { timeout } = require('../playwright.config');


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
  async EnterTextIntoField(page, ElementLocator, optionValue){
    try{
    await page.locator(ElementLocator).waitFor({ state: 'visible' });
    await page.locator(ElementLocator).clear();
    await page.locator(ElementLocator).fill(optionValue);
    }catch(error){
    console.error(`Failed to click on element with locator: ${ElementLocator}`, error);
    throw error;
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
        radioButton.click();
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
      //await page.waitForSelector(optionTextLocator, { state: 'visible', timeout:5000 });
  
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
  async  insidemouseOverElement(page, locator) {
    const element = page.locator(locator);
  
    // Ensure the element is visible before hovering over it
    if (await element) {
      await element.hover();  // Hover over the element
      console.log(`Hovered over element: ${locator}`);
    } else {
      throw new Error(`Element with locator ${locator} not visible.`);
    }
  }
  
  


  // reusableHelpers.js
  async selectDateFromCalendarWithNavigation(page, monthLocator, yearLocator, dateLocator, targetMonth, targetYear, targetDay) {
    // Wait for the calendar button to be visible
    //await page.waitForSelector(calendarBtnLocator, { state: 'visible' });

    // Locate the calendar button and open it
    // const calendarBtn = page.locator(calendarBtnLocator);
    // await calendarBtn.click();
    
    // Wait for the month and year elements to be visible
    await page.waitForSelector(monthLocator, { state: 'visible' });
    await page.waitForSelector(yearLocator, { state: 'visible' });

    // Navigate to the target year
    const yearElement = page.locator(yearLocator);
    let currentYear = await yearElement.innerText();
    while (currentYear !== targetYear) {
        await page.locator('button.next-year').click(); // Click to go to the next year
        currentYear = await yearElement.innerText();
    }

    // Navigate to the target month
    const monthElement = page.locator(monthLocator);
    let currentMonth = await monthElement.innerText();
    while (currentMonth !== targetMonth) {
        await page.locator('button.next-month').click(); // Click next month button
        currentMonth = await monthElement.innerText();
    }

    // Now that the correct month and year are displayed, we need to select the specific day
    const targetDateLocator = dateLocator.replace('DATE_PLACEHOLDER', targetDay); // Assuming dateLocator can accept dynamic day
    
    // Locate the target date element and wait for it to be visible
    const targetDate = page.locator(targetDateLocator);
    await targetDate.waitFor({ state: 'visible' });

    // Select the target date
    await targetDate.click();
    console.log(`Selected date from calendar: ${targetMonth} ${targetDay}, ${targetYear}`);
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

  async openLinkAndVerifyTitle(page, linkLocator, expectedTitle) {
    try {
      const context = page.context();
      
      // Wait for the new page to open
      const pagePromise = context.waitForEvent('page');

      // Click the link to open the new page
      await page.locator(linkLocator).click();

      // Wait for the new page to load
      const newPage = await pagePromise;

      // Verify that the new page has the expected title
      await expect(newPage).toHaveTitle(expectedTitle);

      // Close the new page
      await newPage.close();
      
      console.log(`Successfully opened the link and verified the title: ${expectedTitle}`);
    } catch (error) {
      console.error(`Error while opening the link and verifying the title: ${error.message}`);
      throw error;  // Re-throw the error to ensure the test fails
    }
  }
  async interactWithIframeAndMainPage(page, iframeSelector, iframeAction, mainPageActionSelector) {
    try {
      // Step 1: Get iframe element
      const iframeElement = await page.$(iframeSelector);
  
      if (!iframeElement) {
        throw new Error(`Iframe not found using the selector: ${iframeSelector}`);
      }
  
      // Step 2: Get the iframe's content
      const iframe = await iframeElement.contentFrame();
  
      // Step 3: Perform action inside the iframe (e.g., clicking a button or filling a form)
      await iframeAction(iframe);
  
      // Step 4: After interacting with iframe, perform action on the main page
      await page.click(mainPageActionSelector);
  
    } catch (error) {
      console.error('Error while interacting with iframe and main page:', error);
      throw error; // Re-throw the error if you want the test to fail
    }
  }
  async iframeAction(iframe) {
    try {
        // Example 1: Click a button inside the iframe
        await iframe.click('button#submit'); // Adjust the selector as needed

        // Example 2: Type some text in an input field inside the iframe
        await iframe.type('input[name="username"]', 'testuser'); // Adjust the selector as needed

        // Example 3: Select an option from a dropdown inside the iframe
        await iframe.select('select#dropdown', 'option_value'); // Adjust the selector and value as needed

    } catch (error) {
        console.error('Error performing action inside the iframe:', error);
        throw error; // Re-throw the error to stop the test if something goes wrong
    }
}
// Helper function to type text into an input field with optional delay
async  typeText(page, selector, text, delay = 100) {
  try {
    const element = await page.$(selector);
    if (element) {
      await element.click();  // Focus the input field
      await page.keyboard.type(text, { delay });
    } else {
      throw new Error(`Element with selector "${selector}" not found.`);
    }
  } catch (error) {
    console.error(`Error in typeText: ${error.message}`);
    throw error;  // Rethrow the error to propagate it
  }
}

// Helper function to press a single key
async  pressKey(page, key) {
  try {
    await page.keyboard.press(key);
  } catch (error) {
    console.error(`Error in pressKey: ${error.message}`);
    throw error;  // Rethrow the error to propagate it
  }
}

// Helper function to press multiple keys in sequence
async  pressKeys(page, keys) {
  try {
    for (const key of keys) {
      await page.keyboard.press(key);
    }
  } catch (error) {
    console.error(`Error in pressKeys: ${error.message}`);
    throw error;  // Rethrow the error to propagate it
  }
}

// Helper function to clear an input field
async  clearInput(page, selector) {
  try {
    const element = await page.$(selector);
    if (element) {
      await element.click();  // Focus the input field
      await page.keyboard.press('Control+A');  // Select all text
      await page.keyboard.press('Backspace');  // Delete selected text
    } else {
      throw new Error(`Element with selector "${selector}" not found.`);
    }
  } catch (error) {
    console.error(`Error in clearInput: ${error.message}`);
    throw error;  // Rethrow the error to propagate it
  }
}

// Helper function to type with modifiers (e.g., Shift, Control)
async  typeWithModifiers(page, selector, text, modifiers = []) {
  try {
    const element = await page.$(selector);
    if (element) {
      await element.click();  // Focus the input field
      for (const modifier of modifiers) {
        await page.keyboard.down(modifier);  // Hold the modifier key
      }
      await page.keyboard.type(text);  // Type the text
      for (const modifier of modifiers) {
        await page.keyboard.up(modifier);  // Release the modifier key
      }
    } else {
      throw new Error(`Element with selector "${selector}" not found.`);
    }
  } catch (error) {
    console.error(`Error in typeWithModifiers: ${error.message}`);
    throw error;  // Rethrow the error to propagate it
  }
}

// Helper function to simulate paste (Ctrl+V)
async  pasteText(page, selector, text) {
  try {
    const element = await page.$(selector);
    if (element) {
      await element.click();  // Focus the input field
      await page.keyboard.type(text);  // Type the text
      await page.keyboard.press('Control+V');  // Simulate Ctrl+V (paste)
    } else {
      throw new Error(`Element with selector "${selector}" not found.`);
    }
  } catch (error) {
    console.error(`Error in pasteText: ${error.message}`);
    throw error;  // Rethrow the error to propagate it
  }
}

// Helper function to hold a key and press another
async holdAndPressKey(page, holdKey, pressKey) {
  try {
    await page.keyboard.down(holdKey);  // Hold the modifier key
    await page.keyboard.press(pressKey);  // Press the key
    await page.keyboard.up(holdKey);  // Release the modifier key
  } catch (error) {
    console.error(`Error in holdAndPressKey: ${error.message}`);
    throw error;  // Rethrow the error to propagate it
  }
}



 


}

module.exports = { HelperBase };

  
  

  
  

  