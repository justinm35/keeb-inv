import puppeteer from "puppeteer";
let result = { kbd: [], mino: [], apex: []}

export const congregateSearch = async (query) => {

    return new Promise( async(resolve, reject) => {
        //Accept user search query from client side req
    if(query === "" | query === undefined) {
        console.log('No Input Given')
        return('nope')
    }
    const searchQuery = query
    //Launch browser
    const browser = await puppeteer.launch()



    const pageApex = await browser.newPage()
    await pageApex.goto('https://www.apexkeyboards.ca/search', {timeout: 0})
    //Input user search query into textfield and press form submit button then wait for nav.
    await pageApex.type('input[class="Form__Input"]', searchQuery , {delay: 20})
    
    //Unable to click on button.btn element so pressed Enter instead
    await pageApex.keyboard.press('Enter')
    await pageApex.waitForNavigation({ waitUntil: 'networkidle0' });
    //Grabbing every item Title, Price, & ImageUrl
    const titleSelectorApex = await pageApex.$$('h2.ProductItem__Title > a')
    const priceSelectorApex = await pageApex.$$('span.ProductItem__Price:first-child')
    const imageSelectorApex = await pageApex.$$('img.ProductItem__Image')
    //Evaluate all items returned and push to allItems array    
    let allItems = [];
    if(titleSelectorApex !== undefined) {
        for(let i = 0; i < titleSelectorApex.length; i++) {
            const title = titleSelectorApex[i];
            const titleContent = await pageApex.evaluate(element => element.textContent, title)
            const price = priceSelectorApex[i];
            const priceContent = await pageApex.evaluate(element => element.textContent, price)
            const image = imageSelectorApex[i];
            // const imageContent = await pageApex.$eval("div", image => image.getAttribute('data-bgset'))
            const imageContent = await pageApex.evaluate(element => element.getAttribute('data-srcset'), image)
            const imageContentParsed = imageContent?.split(' ')[0]
            result.apex.push({titleContent, priceContent, imageContentParsed})
        }
    }
    await pageApex.close();
    console.log("step 1 done")

    const pageKbd = await browser.newPage()
    await pageKbd.goto('https://kbdfans.com/search', {timeout: 0})
    //Input user search query into textfield and press form submit button then wait for nav.
    await pageKbd.type('input[id="Search"]', searchQuery , {delay: 20})
    await pageKbd.click('button.btn.search-page-button');
    await pageKbd.waitForNavigation({ waitUntil: 'networkidle0' });
    //Grabbing every item Title, Price, & ImageUrl
    const titleSelectorKbd = await pageKbd.$$('a.product-block__title-link')
    const priceSelectorKbd = await pageKbd.$$('span.theme-money')
    const imageSelectorKbd = await pageKbd.$$('.rimage-background')
    //Evaluate all items returned and push to allItems array
    if(titleSelectorKbd !== undefined || titleSelectorKbd !== []) {
        for(let i = 0; i < titleSelectorKbd.length; i++) {
            const title = titleSelectorKbd[i];
            const titleContent = await pageKbd.evaluate(element => element.textContent, title)
            const price = priceSelectorKbd[i];
            const priceContent = await pageKbd.evaluate(element => element.textContent, price)
            const image = imageSelectorKbd[i];
            // const imageContent = await pageKbd.$eval("div", image => image.getAttribute('data-bgset'))
            const imageContent = await pageKbd.evaluate(element => element.getAttribute('data-bgset'), image)
            const imageContentParsed = imageContent?.split(' ')[0]
            result.kbd.push({titleContent, priceContent, imageContentParsed})
        }
    }
    await pageKbd.close();
    console.log("step 2 done")


    const pageMino = await browser.newPage()
    await pageMino.goto('https://minokeys.com/search', {timeout: 0})
    //Input user search query into textfield and press form submit button then wait for nav.
    await pageMino.type('input[class="input-group-field"]', searchQuery , {delay: 20})
    
    //Unable to click on button.btn element so pressed Enter instead
    await pageMino.keyboard.press('Enter')
    await pageMino.waitForNavigation({ waitUntil: 'networkidle0' });
    //Grabbing every item Title, Price, & ImageUrl
    const titleSelectorMino = await pageMino.$$('div.grid-product__title')
    const priceSelectorMino = await pageMino.$$('div.grid-product__price')
    const imageSelectorMino = await pageMino.$$('img.grid-product__image')
    //Evaluate all items returned and push to allItems array    
    if(titleSelectorMino !== undefined) {
    for(let i = 0; i < titleSelectorMino.length; i++) {
        const title = titleSelectorMino[i];
        const titleContent = await pageMino.evaluate(element => element.textContent, title)
        const price = priceSelectorMino[i];
        const priceContent = await pageMino.evaluate(element => element.textContent, price)
        const image = imageSelectorMino[i];
        // const imageContent = await pageMino.$eval("div", image => image.getAttribute('data-bgset'))
        // const imageContent = await pageMino.evaluate(element => element.getAttribute('data-srcset'), image)
        let imageContentParsed;
        await pageMino.evaluate(element => element.getAttribute('data-srcset'), image)
                .then((imageContent)=>{imageContentParsed = imageContent?.split(' ')[0]})
        // const imageContentParsed = imageContent.split(' ')[0]
        result.mino.push({titleContent, priceContent, imageContentParsed})
    }
    }  

    
    await pageMino.close()
    console.log("step 3 done")

    await browser.close();
    // return result
    resolve(result)
    })
}