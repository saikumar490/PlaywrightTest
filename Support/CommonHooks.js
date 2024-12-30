const { test, chromium, firefox, webkit } = require('@playwright/test');
const { browser,urls } = require('../Support/Constants.js');

// Common Setup and Teardown Hooks

// Hook to run before all tests
test.beforeAll(async ({}) => {
    console.log('Executing before all tests...');
    
    let browserInstance;

    // Dynamically launch the specified browser based on the `browser` variable
    if (browser === 'chrome') {
        browserInstance = await chromium.launch();  // Launch Chromium (Chrome)
    } else if (browser === 'firefox') {
        browserInstance = await firefox.launch();  // Launch Firefox
    } else if (browser === 'webkit') {
        browserInstance = await webkit.launch();  // Launch WebKit (Safari engine)
    } else if (browser === 'safari') {
        browserInstance = await webkit.launch();  // Safari is supported via WebKit
    } else {
        throw new Error('Unsupported browser type');
    }

    const context = await browserInstance.newContext();
    const page = await context.newPage();

    // Navigate to Admin URL
    await page.goto(urls.AdminUrl, { waitUntil: 'load' });

    // Store the browser instance and page for use in your tests
    global.page = page;
    global.browserInstance = browserInstance;

    console.log(`Navigated to ${urls.AdminUrl} using ${browser}`);
});

// Hook to run after all tests
test.afterAll(async ({}) => {
    console.log('Executing after all tests...');

    // Cleanup: Close the browser instance after tests
    if (global.browserInstance) {
        await global.browserInstance.close();
    }
});
