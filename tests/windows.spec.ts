import { test } from "@playwright/test";

test('sequential way of handling window',async({page,context})=>{

    await page.goto('https://www.amazon.in/')

    let searchBox = page.locator('//input[@id="twotabsearchtextbox"]')

    await searchBox.fill('phones')
    await searchBox.press('Enter')
    //step 1: start listening for new window
    let parentWindow = context.waitForEvent('page')
    //create the event listner and promise is created and its pending
    
    //step 2 clcik the product
    await page.locator('(//h2[@class="a-size-medium a-spacing-none a-color-base a-text-normal"])[1]').click()

    //capture the child window after its open
    let childWindow = await parentWindow //resolving the promise

    const price = await childWindow.locator('//span[@class="a-price aok-align-center reinventPricePriceToPayMargin priceToPay apex-pricetopay-value"]').innerText()
    console.log(price);

    console.log(await childWindow.title());//child window title
    console.log(await page.title()); //parent window title
    
    await childWindow.close() //close the childwindow

    //await page.bringToFront() 
    await page.locator("(//a[text()='Bestsellers'])[1]").click()
    await page.waitForTimeout(5000)

    
})