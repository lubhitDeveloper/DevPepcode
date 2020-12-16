const puppeteer= require("puppeteer");

let tab;
(async function () {  
    try {
        let browser= await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"],
        })
        let pages= await browser.pages();
        let page= pages[0];
        tab= page;
        await page.goto("https://www.instagram.com/accounts/login/")
        await page.waitForSelector('input[aria-label="Phone number, username, or email"]');
        await page.type('input[aria-label="Phone number, username, or email"]', "7888402848");
        await page.type('input[aria-label="Password"]', "lubhit@12345");
        //PClick on Login Button
        await Promise.all([page.waitForNavigation({waitUntil:"networkidle0"}), page.click(".sqdOP.L3NKy.y3zKF")]);
        await page.waitForSelector(".sqdOP.L3NKy.y3zKF");
        //click on Save info
        await Promise.all([page.waitForNavigation({waitUntil:"networkidle0"}), page.click(".sqdOP.L3NKy.y3zKF")]);
        await page.waitForSelector(".aOOlW.bIiDR");
        //click on show notifications
        await page.click(".aOOlW.bIiDR");
        await page.waitForSelector(".XTCLo.x3qfX");
        //click on search bar
        await page.type(".XTCLo.x3qfX","beerbiceps");
        await page.waitForSelector(".mTLOB.Szr5J.coreSpriteVerifiedBadgeSmall ");
        //click on beerbiceps profile
        await Promise.all([page.waitForNavigation({waitUntil:"networkidle0"}), page.click(".mTLOB.Szr5J.coreSpriteVerifiedBadgeSmall ")]);
        await page.waitForSelector(".Nnq7C.weEfm div");
        await Promise.all([page.waitForNavigation({waitUntil:"networkidle0"}), page.click(".Nnq7C.weEfm div")]);
        //await doLike();
        await page.waitForSelector(".ltpMr.Slqrh .wpO6b");
        await page.click(".ltpMr.Slqrh .wpO6b");
        for(let i=0; i<9; i++)
        {
            await Promise.all([page.waitForNavigation({waitUntil:"networkidle0"}), page.click('a[class=" _65Bje  coreSpriteRightPaginationArrow"]')]);
            await page.waitForSelector(".ltpMr.Slqrh .wpO6b");
            await page.click(".ltpMr.Slqrh .wpO6b");
        }
        //await page.click('a[class=" _65Bje  coreSpriteRightPaginationArrow"]');
    }
    catch(error) {
        console.log(error);
    }
})();

// async function doLike() {
//     await tab.waitForSelector(".v1Nh3.kIKUG._bz0w a");
//     let allPostsATags= await tab.$$(".v1Nh3.kIKUG._bz0w a");
//     let i;
//     let allPosts= [];
    
//     for(i=0; i< allPostsATags.length; i++);
//     {
//         let oneLink= await tab.evaluate(function(elem) {
//             return elem.getAttribute("href");
//         }, allPostsATags[i]);
//         let completePostLinks = "https://www.instagram.com" + oneLink;
//         allPosts.push[completePostLinks];
//     }
//     console.log(allPosts);
// }
