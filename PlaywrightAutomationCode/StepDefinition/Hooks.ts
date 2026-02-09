import { BeforeAll, AfterAll, After, Before, Status } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from '@playwright/test';
import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";

export let page : Page

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {

    browser = await chromium.launch({
        headless: false,
        args: ["--start-maximized"],
    });

    console.log("BeforeAll")

});

Before(async function () {

    context = await browser.newContext({
        recordVideo: { dir: 'test-result/videos' },
        viewport: null
    });

    page = await context.newPage();

    console.log("Before")
});

After(async function ({ pickle, result }) {

    if (result?.status === Status.FAILED) {
        // Screenshots are saved in the directory after the test is completed for each scenario
        const img = await page.screenshot({ path: `./test-result/ScreenshotsFailed/${pickle.name}.png` });

        await this.attach(img, 'image/png');

        // Attach video on failure (if enabled in Playwright config)
        const videoPath = await page.video()?.path();
        
        if (videoPath) {
            this.attach(videoPath, 'video/webm');
        }
    }
    else if (result?.status === Status.PASSED) {
        const img = await page.screenshot({ path: `./test-result/ScreenshotsPassed/${pickle.name}.png` });

        await this.attach(img, 'imagepasssed/png');

        const videoPath = await page.video()?.path();

        if (videoPath) {
            this.attach(videoPath, 'video/webm');
        }
    }
    console.log("after")
});

AfterAll(async function () {

    //close
    await page.close();

    //browser.close/context.close 
    await browser.close();

    console.log("afterAll")

    console.log("==============================")
}); 


Then('I Verify test data reading from the feature file {string},{string},{string},{string},{string},{string}', async function (Name, Email, Phone, Address, Wikipedia,  errormessgae) {

    await page.getByPlaceholder("Enter Name").fill(Name)

    await page.getByPlaceholder("Enter EMail").fill(Email)

    await page.locator("#phone").fill(Phone)

    await page.locator("#textarea").fill(Address)

    await page.locator(".wikipedia-search-input").fill(Wikipedia)

    await page.locator(".wikipedia-search-button").click()

    //await expect(page.locator("sayali")).toHaveText(errormessgae)
});

Then('I launch the test automation practice hooks', async function () {

    await page.goto("https://testautomationpractice.blogspot.com/")

});

/* Then('I Verify test data reading from the feature file1 {string},{string}', async function (username,password) {

   await pageFixture.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")

    await pageFixture.page.locator("//*[@name='username']").fill(username)

    await pageFixture.page.locator("//*[@name='password']").fill(password)

    await pageFixture.page.locator("//*[@type='submit']").click()
});  */
