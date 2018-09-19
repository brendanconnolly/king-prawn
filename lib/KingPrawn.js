

var puppeteer = require('puppeteer');

let KingPrawn = function () {
    let puppeteerSlowMo = 25;

    //_browser, _pages[]


    this.explore = async function (url) {

        let browser = await puppeteer.launch({ headless: false, slowMo=puppeteerSlowMo });
        let page = await browser.newPage();
        // lets page contents take full window
        await page.setViewport({ width: 0, height: 0 });
        await page.goto(url);
        return await page;
    }

    this.with = async function (reporter) {

        //apply reporter to page
        // _page.on("click",reporter)
    }

    this.toDiscover = function (msg) {

    }

    // pepe.explore().with(reporter/tracking).toDiscover(msg)

    //disconnect, close/finished
    //explore => visible regular viewport
    // compare =>2 browsers side by side
    // verify headless
};

// 
//spin up browser store ws connection for reconnect
//side by side 
// emulate network
// event forwarding


module.exports = KingPrawn;
