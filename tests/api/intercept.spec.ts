//web app --> intercept the network calls anf log them
// ** = wildcard ---> matches all the URLs..

import { test, expect } from '@playwright/test';

//intercept the network call....
test('intercept and log requests ', async ({page}) => {

    page.route('**/*', async(route) => {
        console.log(route.request().method(), route.request().url());
       await route.continue(); //url1 -- capture and continue../ url2 -- capture -- continue
    });

    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=common/home');
})

//intercept with mocking:
//mocking: fake data/response
test('moch the search data api', async ({ page }) =>{

    let mockProducts =[
        {
            name: 'Fake MacBook Pro', price: "$1900"
        },
        {
             name: 'Fake iPhone Duo', price: "$1900"
        }
    ];

    await page.route(('**/index.php?route=product/search&search=macbook'), (route)=>{

        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(mockProducts)
        });
    });

    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=product/search&search=macbook');

    await page.pause();

   let fakeJson= await page.evaluate(async () =>{
        let fakeRes = await fetch('https://naveenautomationlabs.com/opencart/index.php?route=product/search&search=macbook');
        return await fakeRes.json();
    })

    console.log("fake json response: ", fakeJson);

});