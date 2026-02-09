import { Given, Then, When, context, setDefaultTimeout } from '@cucumber/cucumber'
import { Browser, chromium, expect, Page } from '@playwright/test';
setDefaultTimeout(10 * 6000)
let browser: Browser, page: Page

Given('I launch the browser', async function () {
    console.log("I launch the browser")
    browser = await chromium.launch({
        headless: false,
        args: ['--start-maximized']

    })
    const context = await browser.newContext({ viewport: null })
    page = await context.newPage()

});

When('I launch the test automation', async function () {
    await page.goto("https://testautomationpractice.blogspot.com/")


});

Then('I close the browser', async function () {
    await page.close()

});

//===================================Xpath and CSS locators===================================
Then('verify Xpath and CSS locators', async function () {
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

    //Along with Text() method , we have Intertext(), and InnerHTML()
    console.log("Inner text(), InnerHTML()")

    let Innertext = await page.locator('//button[@onclick="myFunctionAlert()"]').innerText()
    console.log(Innertext)
    let Innerhtml = await page.locator('//button[@onclick="myFunctionAlert()"]').innerHTML()
    console.log(Innerhtml)

    //And()
    await page.locator('//input[@type="text" and @id="name"]').fill("Honey")
    //OR()
    await page.locator('//input[ @placeholder="Enter Name" or @maxlength="15"]').fill("HoneyGeethu")
    //ALL()  it will return morethen webelement.

    let Allement = await page.locator('//input[@type="text"]').all()
    console.log(Allement.length)


    //======================================Xpath Axes=================================
    console.log('//Relative Xpath axes')
    //Parent:
    var parent = await page.locator('//input[@placeholder="Enter Name"]//parent::div').all()
    console.log(parent.length) //Own parent

    //ancestor
    var ancestor = await page.locator('//input[@placeholder="Enter Name"]//ancestor::div').all()
    console.log(ancestor.length) //parent /grant parent/ greate parents for div

    //preceding
    var preceding = await page.locator('//input[@placeholder="Enter Name"]//preceding::div').all()
    console.log(preceding.length)  //all before div elements

    //child
    await page.locator('//div[@class="form-group"]//child::input[@type="text"]').all()   //here we have found 3 webelements
    await page.locator('//div[@class="form-group"]//child::input[@type="text"]').first().fill("Srilathaagain") //fill first box

    //Following-sibling
    await page.locator('//input[@id="field1"]//following-sibling::input').fill("Entertest")

    //Following
    await page.locator('//input[@id="field1"]//following::input[@id="field2"]').fill('Fillagain1')

});

Then('I close the browser1', async function () {
    await page.close()

});

Then('verify the playwright methods', async function () {
    console.log("verify the playwright methods")
    //reload
    console.log("Reload")
    await page.reload()

    //Click
    console.log("Click on the webelement--click")
    await page.locator('//button[text() = "New Tab"]').click()

    //BringtoFront
    console.log("Go to previous page--bringToFront")
    await page.bringToFront()
    await page.locator("#Wikipedia1_wikipedia-search-input").fill("Bring to front page")
    await page.getByPlaceholder("Enter Name").fill("Srilatha")
    await page.getByPlaceholder("Enter Phone").type("kanukuntla")

    //Get more than one web element
    console.log("Get more than one web element")
    let Webelements = await page.locator('//input[@type="text"]').all()
    console.log(Webelements.length)
    await page.locator('//input[@id="field1"]//following-sibling::input').fill('Sometext')

    //title of the web element
    console.log("title of the web element")
    console.log(await page.title())   ///directly we can print without store the value

    //URL of the web element
    console.log("URL of the web element")
    console.log(await page.url())   ///directly we can print without store the value

    //Scrolltoviewifneeded
    console.log("Scrolltoviewifneeded")
    await page.locator('//input[@id="field1"]').scrollIntoViewIfNeeded()  //scroll top to down and down to top.

    //Clear
    console.log("clear")
    await page.locator('//input[@id="field1"]').clear()

    //Innertext and Innet HTML
    console.log("Innertext and Innet HTML")
    console.log(await page.getByText("Alerts & Popups").innerText())
    console.log(await page.getByText("Alerts & Popups").innerHTML())

    //Allinnettext  and  Alltextcontent works same. -----it will read the all webelement text
    console.log("Read the text of the all the web element")
    let Allinnertext = await page.locator('//*[@class="title"]').allInnerTexts()
    console.log(Allinnertext)

    //Forloop
    console.log("ForLoop")
    for (var i = 0; i < Allinnertext.length; i++) {
        console.log(Allinnertext[i])

    }

    //Rightclick on the webelememt
    console.log("Right click")
    await page.getByText('Point Me').click({ button: 'right' })

});

Then('I close the browser2', async function () {
    await page.close()

});

Then('verify the playwright methods2', async function () {
    console.log("verify the playwright methods2")
    //isHidden
    console.log("isHidden")
    let Hiddenele = await page.locator('//*[text()= "Female"]').isHidden()
    console.log(Hiddenele)
    if (Hiddenele == false) {
        await page.locator('//*[text()= "Female"]').click()
    }

    //isVissible
    console.log("isvisible")
    let visibleelement = await page.locator('//*[text()= "Male"]').isVisible()
    console.log(visibleelement)
    if (visibleelement == true) {
        await page.locator('//*[text()= "Male"]').click()
    }

    //isDisible
    console.log("isDisible")
    let isVisible = await page.getByText('Simple Alert').isDisabled()
    console.log(isVisible)
    if (visibleelement == false) {
        await page.getByText('Simple Alert').click()
    }
    //isEnabled
    console.log("isEnabled")
    let isEnabled = await page.locator('#sunday').isEnabled()
    console.log(isEnabled)
    if (isEnabled == true) {
        await page.locator('#sunday').click()
    }

    //isEditable
    console.log("isEditable")
    let isEditable = await page.locator('#textarea').isEditable()
    console.log(isEditable)
    if (isEditable == true) {
        await page.locator('#textarea').fill('It is editable textbox')
    }

    //isChecked ---1st way ======radio buttons and checkboxes it will work
    console.log("isChecked")
    let isChecked = await page.locator('#saturday').isChecked()
    console.log(isChecked)
    if (isChecked == false) {
        await page.locator('#saturday').click()
    }
    //set checked---======radio buttons and checkboxes it will work
    console.log("setChecked")
    await page.locator('#saturday').setChecked(true)
    let setchecked = await page.locator('#saturday').isChecked()
    console.log(setchecked)

    //uncheck 
    console.log("uncheck")
    let unchecked = await page.locator('#saturday').uncheck()
    console.log(unchecked)



});
Then('I close the browser3', async function () {
    await page.close()

});

Then('verify the playwright methods3', async function () {
    console.log("verify the playwright methods3")

    //Mouse hover
    console.log('Mouse Hover')
    await page.getByText('Point Me').scrollIntoViewIfNeeded()
    await page.getByText('Point Me').hover()
    await page.locator('//input[@type="text"]').first().hover()

    //Highlighted
    console.log("highlighted")
    await page.locator('#Wikipedia1_wikipedia-search-input').highlight()
    await page.locator('#Wikipedia1_wikipedia-search-input').fill("testing")

    //get attribute
    console.log("get attribute")
    let getattribute = await page.locator('#Wikipedia1_wikipedia-search-input').getAttribute("class")
    console.log(getattribute)

    //Clear different ways  
    await page.locator('#Wikipedia1_wikipedia-search-input').clear()
    await page.locator('#Wikipedia1_wikipedia-search-input').fill("testing again")
    await page.locator('#Wikipedia1_wikipedia-search-input').fill(" ")
    await page.locator('#Wikipedia1_wikipedia-search-input').fill("testingtesting")

    //Keyboard actions ----press
    await page.locator('#Wikipedia1_wikipedia-search-input').press('Control+A')
    await page.keyboard.press('Delete')
    await page.keyboard.up('Control')
    await page.keyboard.insertText("Keyboard actions")

    //presssequencially 
    await page.locator('#Wikipedia1_wikipedia-search-input').pressSequentially('pressequencially test')

    //drag and drop 
    let Drag = await page.locator('#draggable')
    let drop = await page.locator('#droppable')

    await Drag.dragTo(drop)

});

Then('I close the browser4', async function () {
    await page.close()


});

Then('verify the playwright methods4', async function () {
    console.log("verify the playwright methods4")

    //Dropdown values -----Selectoption
    console.log("SelectOption")
    let coloroption = await page.getByText('Colors')
    await coloroption.selectOption("Green")
    await coloroption.selectOption(['Green', 'Red',])

    //Sort values
    console.log("Sort values")
    let Sortvalues = await page.getByText("Sorted List")
    await Sortvalues.scrollIntoViewIfNeeded()
    await Sortvalues.selectOption("Deer")
    await Sortvalues.selectOption(['Dog', 'Cat'])

    //nth value
    console.log("nth value")
    let nthvalue = await page.locator('//*[@type="text"]')
    await nthvalue.nth(3).fill("nthmethod testing")
    await nthvalue.nth(1).fill('first')
    await nthvalue.nth(2).fill("second")

    //Screen shot
    console.log("Screenshots")
    await page.getByPlaceholder("Enter Name").screenshot({ path: 'webelementscreenshot.png' })
    await page.screenshot({ path: 'screenlength.jpg' })
    await page.screenshot({ path: 'total.jpg', fullPage: true })
    //Different folder:
    await page.screenshot({ path: './tests/screenshot/fullpage.jpg' })


});

Then('I close the browser5', async function () {
    await page.close()


});

//Dates verification
Then('verify the dates in playwright', async function () {
    console.log("verify the dates in playwright")

    let todaysdate = new Date()
    console.log(todaysdate)

    const locatdate = todaysdate.toLocaleDateString()
    console.log(locatdate)
    todaysdate.setDate(todaysdate.getDate())
    const formatdate = todaysdate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })
    console.log(formatdate)
    await page.fill('#datepicker', formatdate)

})

Then('I close the browser6', async function () {
    await page.close()

});

//Web tables with static data
Then('verify the webtables and web calender', async function () {
    console.log("verify the webtables and web calender")
    let webtable = await page.locator('//*[@name="BookTable"]').isVisible()
    if (webtable == true) {
        console.log('webtable is displayed on the webpage')
        let expected = "Animesh"
        let actual = await page.locator('//*[@name="BookTable"]/tbody/tr[4]/td[2]').innerText()
        if (actual == expected) {
            console.log(expected, "is displayed on the table")
        }

        else {
            console.log(expected, 'is not displayed on the table')
        }

    }
    else {
        console.log('webtable is not displayed on the webpage')

    }

})

Then('I close the browser7', async function () {
    await page.close()

});

//Web tables with Dynamicway
Then('verify the webtables dynamicway', async function () {
    console.log("verify the webtables dynamicway")
    let webtable = await page.locator('//*[@name="BookTable"]').isVisible()
    if (webtable == true) {

        let rowscount = await page.locator("//*[@name='BookTable']/tbody/tr").all()
        if (rowscount.length > 0) {
            console.log(rowscount)
            for (let i = 2; i <= rowscount.length; i++) {
                let columncount = await page.locator("//*[@name='BookTable']/tbody/tr[" + i + "]/td").all()
                if (columncount.length > 0) {
                    console.log('table does have columns', columncount.length)
                    for (let J = 1; J <= columncount.length; J++) {
                        let expecteddata = "Java"
                        let Actualdata = await page.locator("//*[@name='BookTable']/tbody/tr[" + i + "]/td[" + J + "]").innerText()
                        if (Actualdata == expecteddata) {

                            console.log(expecteddata, "Java")
                            console.log(expecteddata, i, J)
                        }
                        if (Actualdata.includes(expecteddata)) {
                            console.log(expecteddata, i, J)

                        }
                    }
                }
                else {
                    console.log("table does not have columns")
                }
            }
        }
        else {
            console.log("table does not have rows")
        }
    }
    //just for practise below line playwright and method: below we can use both Locator and Xpath
    await page.getByPlaceholder("Enter Name").and(page.locator('#name')).fill('Srilatha')
})

Then('I close the browser8', async function () {
    await page.close()

});

//Web calander verify with dynamic way

Then('verify the calander dynamicway', async function () {
    let calander = await page.locator("#datepicker").isVisible()
    if (calander == true) {
        console.log("calander is visible on webpage")
        await page.locator("#datepicker").click()
        let calandrowcount = await page.locator(".ui-datepicker-calendar").all()
        if (calandrowcount.length > 0) {
            console.log("calander have rows")
            for (let i = 1; i <= calandrowcount.length; i++) {
                let calanderculumn = await page.locator('//table[@class="ui-datepicker-calendar"]/tbody/tr[' + i + ']/td').all()
                if (calanderculumn.length > 0) {
                    console.log("calander have columns")
                    for (let J = 1; J <= calanderculumn.length; J++) {
                        let expectednumber = '3'
                        let actualnumber = await page.locator('//table[@class="ui-datepicker-calendar"]/tbody/tr[' + i + ']/td[' + J + ']').innerText()
                        if (actualnumber == expectednumber) {
                            console.log("expected number:", expectednumber)
                            console.log(expectednumber, i, J)
                            await page.locator('//table[@class="ui-datepicker-calendar"]/tbody/tr[' + i + ']/td[' + J + ']').click()
                        }
                    }
                }
                else {
                    console.log("Calander has no columns")
                }
            }
        }
    }
    else {
        console.log('calander is not visible on the webpage')
    }

})

Then('I close the browser9', async function () {
    await page.close()

});


//Web table Pagination verify with dynamic way

Then('verify the webtable pagination', async function () {
    let pagenumbers = await page.locator('//ul[@id="pagination"]/li').all()
    let Table = await page.locator("#productTable").isVisible()
    if (Table == true) {
        console.log("Table also visible")
            for (let P = 1; P <= pagenumbers.length; P++) {
                if (pagenumbers.length >= 1) {
                    let devicename = await page.getByText('Portable Charger').isVisible()
                    if (devicename == true) {
                        let rowcount = await page.locator('//table[@id="productTable"]/tbody/tr').all()
                        if (rowcount.length > 0) {
                            console.log("rowcount :", rowcount.length)
                            for (let i = 1; i <= rowcount.length; i++) {
                                let columncount = await page.locator('//table[@id="productTable"]/tbody/tr[' + i + ']/td').all()
                                if (columncount.length > 0) {
                                    console.log("column count:", columncount)
                                    for (let C = 1; C <= columncount.length; C++) {
                                        let expected = "Portable Charger"
                                        let Actual = await page.locator('//table[@id="productTable"]/tbody/tr ['+ i +']/td['+ C +']').innerText()
                                        if (expected == Actual) {
                                            console.log("expected values is:", expected)
                                            const row = page.locator('tr', { hasText: 'Portable Charger' })
                                            await row.locator('input[type="checkbox"]').check()
                                        }

                                    }
                                }
                            }
                        }
                    }
                    else
                        await page.locator('//ul[@class="pagination"]/li[' + P + ']').click()



                }


            }
        }
    });


Then('I close the browser10', async function () {
    await page.close()

});


// =======================Assertions=========================
Then('verify the Hard Assertions', async function () {

    await expect(page.locator('#input1')).toBeVisible()
    await page.locator('#input1').fill("Assertion testing")

    await expect(page.locator('#input1')).toBeTruthy()
    await page.locator('#input1').fill("Assertion testing again")

    await expect(page.getByText('Item 1')).toBeHidden()
    console.log('Hidden')

    await expect(page.getByPlaceholder("Select an item")).toBeEnabled()
    await page.getByPlaceholder("Select an item").fill("Testing")

    await expect(page.getByPlaceholder("Select an item")).toBeEditable()
    await page.getByPlaceholder("Select an item").pressSequentially("Testing")

    await expect(page.getByText("START")).toBeAttached()
    await page.getByText("START").click()

    await expect(page.getByText('Simple Alert')).toHaveCount(1)
    console.log('1')

    await expect.soft(page.locator('#input1')).toBeVisible()
    await page.locator('#input1').fill("Assertion testing")

    await expect.soft(page.locator('#input1')).toBeTruthy()
    await page.locator('#input1').fill("Assertion testing again")


});


