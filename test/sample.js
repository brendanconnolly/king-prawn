const puppeteer = require('puppeteer');
const KingPrawn = require('../lib/KingPrawn.js');
const fetch = require('node-fetch');

(async () => {

    pepe = new KingPrawn();

    let page = await pepe.existingSession(`google.com`);
    //let page = await pepe.explore(`https://google.com`);
    await page.type(`input[name="q"]`, `joe mama`);
    await page.click(`input[name="btnK"]`)
    //#resultStats
    await page.waitFor(`#top_nav`);
    let stats = await page.$eval(`div#resultStats`, el => el.innerText);
    console.log(stats);
    page.goBack();

    // pepe.explore(`https://www.google.com`)

})();
