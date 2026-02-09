import { Given, Then, When, context, setDefaultTimeout } from '@cucumber/cucumber';
import { Browser, chromium, expect, Page } from '@playwright/test';
import { TIMEOUT } from 'node:dns';
let browser: Browser, page: Page
Given('I launch the browser1', async function () {
    console.log("I launch the browser")
    browser = await chromium.launch({
        headless: false,
        args: ['--start-maximized']

    })
    const context = await browser.newContext({ viewport: null })
    page = await context.newPage()

});

When('I launch the test automation1', async function () {
    await page.goto("https://www.saucedemo.com/")

});
//=================================================Buttons Filter
Then('verify the playwright filters', async function () {
    await page.getByPlaceholder('Username').fill("standard_user")
    await page.getByPlaceholder('Password').fill("secret_sauce")
    await page.locator('#login-button').click()
    await page.locator('.inventory_item').filter({ hasText: "Sauce Labs Fleece Jacket" }).getByRole('button', { name: 'Add to cart' }).click()

    //Checkbox and radio buttons
    await page.goto("https://testautomationpractice.blogspot.com/")
    await page.locator("//div[@class ='form-check form-check-inline']").filter({ hasText: "Wednesday" }).scrollIntoViewIfNeeded()
    await page.locator("//div[@class ='form-check form-check-inline']").filter({ hasText: "Wednesday" }).click()
    await page.locator("//div[@class ='form-check form-check-inline']").filter({ hasText: "Female" }).click()
    //below first() means Female also male text, so we should use first() means click first text
    await page.locator("//div[@class ='form-check form-check-inline']").first().filter({ hasText: "Male" }).click()

});

Then('I close the chrome browser', async function () {
    await page.close()

});


//===================================================Alerts ================

Then('verify the playwright filters Alerts', async function () {

    await page.goto("https://the-internet.herokuapp.com/javascript_alerts")

    await page.on('dialog', (dialog) => {

        console.log("dialog/popup type is", dialog.type()) //prompt

        expect(dialog.type()).toContain("alert")

        console.log("dialog/popup message is", dialog.message()) //I am a JS prompt

        expect(dialog.message()).toContain("I am a JS Alert")

        dialog.dismiss()
    })

    await page.locator("//button[text()='Click for JS Alert']").click()
});

Then('verify the playwright filters promt', async function () {

    await page.goto("https://the-internet.herokuapp.com/javascript_alerts")

    await page.on('dialog', (dialog) => {

        console.log("dialog/popup type is", dialog.type()) //prompt

        expect(dialog.type()).toContain("prompt")

        console.log("dialog/popup message    is", dialog.message()) //I am a JS prompt

        expect(dialog.message()).toContain("I am a JS prompt")

        dialog.accept("hi quality thought team, good morning")
    })

    await page.locator("//button[text()='Click for JS Prompt']").click()
});

Then('I close the chrome browser2', async function () {
    await page.close()

});


//==================================Upload files=============================

When('I launch the test automations', async function () {
    await page.goto("https://testautomationpractice.blogspot.com/")

});

Then('verify the playwright file uploading', async function () {
    //===========Add single files========================
    console.log('verify the playwright single file uploading')
    await page.locator('#singleFileInput').scrollIntoViewIfNeeded()
    var SingleFile = await page.waitForSelector('#singleFileInput',{timeout : 6000})
    await SingleFile.setInputFiles("./test-result/screenshots/Fullpage.jpg")  //change to forword slash
    await page.locator('//button[text()="Upload Single File"]').click()

    //===========Add multiple files========================
    console.log('add multiple file')
    await page.locator('#multipleFilesInput').scrollIntoViewIfNeeded()
    var multiplefiles = await page.waitForSelector("#multipleFilesInput", {timeout : 5000})
    await multiplefiles.setInputFiles(["C:/Users/srila/OneDrive/Pictures/HoneyPhoto.jpg", "./test-result/screenshots/Fullpage.jpg"])
    await page.locator('//button[text()="Upload Multiple Files"]').click()

});

Then('I close the chrome browser3', async function () {
    await page.close()

});

//===============================Frames=============================

Then('verify the playwright Frames', async function () {
    await page.goto('https://ui.vision/demo/webtest/frames/')

    //========frames============
    let allframescount = await page.frames()
    console.log(allframescount.length)  //7

    //==========Framelocator============= 
    //1st way: direct
    await page.frameLocator('//frame[@src="frame_1.html"]').locator('//input[@name="mytext1"]').fill('testing frames')

    //==========Framelocator with variable store============= 
    //2nd way: create variable 
    var Frame1 = await page.frameLocator('//frame[@src="frame_1.html"]').locator('//input[@name="mytext1"]')
    Frame1.fill("Testing")

    //==========Frame(pass url) with variable store============= 
    //3rd way=========passing frame URl
    var frameurl = await page.frame({url:'https://ui.vision/demo/webtest/frames/frame_3.html'})
    await frameurl?.fill('//input[@name="mytext3"]', "testing with frameurl")

    //====================childFrame --child frame count======================
    var childframecount = frameurl?.childFrames()
    console.log(childframecount?.length)   //1

    //====================switch to child frame======================
    if (childframecount && childframecount.length > 0){
    await childframecount[0].locator("//span[text()= 'I am a human']").click()}
    
});

Then('I close the chrome browser4', async function () {
    await page.close()

});