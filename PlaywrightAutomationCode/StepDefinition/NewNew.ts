import { Given, Then, When, context, setDefaultTimeout } from '@cucumber/cucumber'
import { Browser, chromium, expect, firefox, Page, webkit, } from '@playwright/test';
setDefaultTimeout(10 * 6000)
let browser: Browser, page: Page

Given('I launch the chrome browser', async function () {
    console.log("I launch the different browser")
    browser = await chromium.launch({
        headless: false,
        args: ['--start-maximized']

    })
    const context = await browser.newContext({ viewport: null })
    page = await context.newPage()

});

Given('I launch the webkit browser', async function () {
    console.log("I launch the different browser")
    browser = await webkit.launch({
        headless: false,
        args: ['--start-maximized']
    })
    const context = await browser.newContext({ viewport: null })
    page = await context.newPage()

});

Given('I launch the safari browser', async function () {
    console.log("I launch the different browser")
    browser = await firefox.launch({
        headless: false,
        args: ['--start-maximized']

    })
    const context = await browser.newContext({ viewport: null })
    page = await context.newPage()

});

Given('I launch the chrome headless browser', async function () {
    console.log("I launch the different browser")
    browser = await chromium.launch({
        headless: true,
        args: ['--start-maximized']

    })
    const context = await browser.newContext({ viewport: null })
    page = await context.newPage()

});

When('I launch the test automation site', async function () {
    await page.goto("https://testautomationpractice.blogspot.com/")


});

//===================================Xpath and CSS locators===================================
Then('I launch the different web browsers', async function () {
    console.log("Xpath CSS locators")

    //===================================Locators===================================

    await page.getByPlaceholder("Enter Name").fill("Srilatha")
    await page.getByPlaceholder("Enter EMail").fill("Srilatha@gmail.com")
    await page.getByText("Simple Alert").click()
    await page.getByRole("button", { name: 'Simple Alert' }).click()
    await page.getByRole("checkbox", { name: 'Sunday' }).click()
    await page.getByPlaceholder("Enter Name").scrollIntoViewIfNeeded()
    await page.getByPlaceholder("Enter Name").type("kanukuntla")

    //=====Absolute Xpath will not work in real time===============

    //========================Relative Xpath====================

    //await page.locator("relative Xpath").methods() 
    console.log('Relative Xpath')

    await page.locator('//input[@placeholder="Enter Phone"]').fill('123456')

    //CSS locators ; same like xpath remove special character // and @   and also   (# yash) for ID and (. dot) means class
    await page.locator('input[placeholder="Enter Phone"]').clear()
    await page.locator('#email').fill("H@gmail.com")
    await page.locator('.dropbtn').click()

    //=============================Xpath methods=====================
    console.log('Relative Xpath methods')
    //Contains():
    await page.locator('//input[contains(@placeholder,"Enter Phone")]').fill('1111111111')
    await page.locator("//input[contains(@id,'monday')]").click()
    await page.locator("//*[contains(@id,'textarea')]").fill("testing")

    //starts-with():  same like contains just change contains to start-with
    await page.locator('//*[starts-with(@id,"wednesday")]').click()
    await page.locator('//input[starts-with(@id, "field1")]').fill('Field1')
    await page.locator('//input[starts-with(@id, "male")]').click()

    //Text()
    await page.locator('//*[text()="Dynamic Button"]').isVisible()
    await page.locator('//*[text()="START"]').click()
    await page.locator("//*[contains(text(),'Female')]").click()

});

Then('I close the diffbrowser', async function () {
    await page.close()

});



//=====================waits:============================

Then('verify the Waits', async function () {
    console.log("waits")
//Waitfortimeout() -----------Static
    await page.waitForTimeout(10000)
    await page.locator('#name').waitFor({state: 'visible'})
    await page.locator("#name").fill("Srilatha")
    

//==============waitforselector()--------dynamic==============
 
    //1st way
    await page.waitForSelector("#email")
    await page.locator('#email').fill('Srilatha@gmail.com')

    //2nd way
    
    await page.waitForSelector('#textarea')
    await page.locator('#textarea').fill("Srilatha")
    await page.getByRole("button", { name: 'Simple Alert' }).click()
    await page.getByRole("checkbox", { name: 'Sunday' }).click()
    await page.getByPlaceholder("Enter Name").scrollIntoViewIfNeeded()
    await page.getByPlaceholder("Enter Name").type("kanukuntla")

//=================waitforloadstate()------dynamic==============

    await page.waitForLoadState()
    await page.locator('#tuesday').fill("Srilatha")
    await page.getByRole("button", { name: 'Simple Alert' }).click()
    await page.getByRole("checkbox", { name: 'Sunday' }).click()
    await page.getByPlaceholder("Enter Name").scrollIntoViewIfNeeded()
    await page.getByPlaceholder("Enter Name").type("kanukuntla")

});

Then('I close the browser11', async function () {
    await page.close()

});

//=======================Windows and pages Handling====================

Then('Windows and Pages Handling', async function () {
    browser = await chromium.launch({
        headless: false,
        args: ['--start-maximized']

    })
    const context = await browser.newContext({ viewport: null })
    let page = await context.newPage()
    let page1 = await context.newPage()
    let page2 = await context.newPage()
    let page3 = await context.newPage()
    
    let pagecount = context.pages()
    console.log(pagecount.length)

    await page.goto("https://testautomationpractice.blogspot.com/")
    await expect(page).toHaveTitle('Automation Testing Practice')

    await page1.goto('https://ui.vision/demo/webtest/frames/')
    await expect(page1).toHaveTitle('Frames - Web Automation Test')

    await page2.goto('https://www.facebook.com/login.php/')
    await expect(page2).toHaveTitle('Log in to Facebook')

    await page3.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await expect(page3).toHaveTitle('OrangeHRM')

    await page3.getByPlaceholder('username').fill('Admin')
    await page3.getByPlaceholder('password').fill('admin123')

    let frames = await page1.frames()
    console.log(frames.length)

    //===========If you want to come to other pages use INDEX[]=================
    await pagecount[0].bringToFront()
    await page.locator('#name').fill('Wondows testing')
    await page.locator('//button[text() = "New Tab"]').click()

    await page1.waitForTimeout(3000)
    let pagecounts = context.pages()
    console.log(pagecounts.length)

    await pagecounts[4].close()

    //==================popup window=============================
    const pagepopup = page.waitForEvent("popup")
    await page.getByText('Popup Windows').scrollIntoViewIfNeeded()
    await page.getByText('Popup Windows').click()
    await page.waitForTimeout(3000)

    const popupPage = await pagepopup;
    const title = await popupPage.title();
    console.log('pagepup title is:', title);

    pagecounts = context.pages()
    await page.waitForTimeout(4000)
    await pagecounts[4].close()
    await pagecounts[5].close()
    await context.close()   
    
});

Then('I close the browser0', async function () {
    await browser.close()

});