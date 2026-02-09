import { Given, Then, When, context, setDefaultTimeout} from '@cucumber/cucumber'
import { Browser, chromium, expect, Page} from '@playwright/test';
setDefaultTimeout(10 * 6000)
let browser: Browser, page: Page
import { Firstset1, Firstset2, Firstset3} from '../Files/testfile.json'

Given('I launch the browsera', async function () {
    console.log("I launch the browsera")
    browser = await chromium.launch({
        headless: false,
        args: ['--start-maximized']

    })
    const context = await browser.newContext({ viewport: null })
    page = await context.newPage()

});

When('I launch the test automation url', async function () {
    await page.goto("https://testautomationpractice.blogspot.com/")


});
///=================================== TDD with json file=========================
Then('TTD and Hooks verification set1', async function () {

    await page.getByPlaceholder("Enter Name").fill(Firstset1.name)
    await page.getByPlaceholder("Enter EMail").fill(Firstset1.email)
    await page.getByPlaceholder("Enter phone").fill(Firstset1.Phone)
    await page.locator("#textarea").fill(Firstset1.Address)
    

});
Then('I close the browser', async function () {
    await page.close()

});

Then('TTD and Hooks verification set2', async function () {

    await page.getByPlaceholder("Enter Name").fill(Firstset2.name)
    await page.getByPlaceholder("Enter EMail").fill(Firstset2.Email)
    await page.getByPlaceholder("Enter phone").fill(Firstset2.Phone)
    await page.locator("#textarea").fill(Firstset2.Address)
    
});

Then('I close the browser', async function () {
    await page.close()

});
///=================================== below from feature file=========================

Then('TTD with feature file {string},{string},{string},{string}', async function (name, email, phone, address) {

    await page.getByPlaceholder("Enter Name").fill(name)
    await page.getByPlaceholder("Enter EMail").fill(email)
    await page.getByPlaceholder("Enter phone").fill(phone)
    await page.locator("#textarea").fill(address)
    
});

Then('I close the browserd', async function () {
    await browser.close()

});


