
const fetch = require('node-fetch');
const puppeteer = require('puppeteer');

function KingPrawn() {
    let puppeteerSlowMo = 25;

    //_browser, _pages[]

    async function launchChrome() {
        //launch chrome via command line with args open -a Google\ Chrome --args --remote-debugging-port=9222
    };

    async function getWsDebuggerUrl(pageUrl, chromeDebuggingPort = `9222`) {

        const url = `http://localhost:${chromeDebuggingPort}/json`
        console.log(url);
        const response = await fetch(url);
        const json = await response.json();
        const pageWsDebuggerUrl = json.find(x => x.url.includes(pageUrl)).webSocketDebuggerUrl;
        console.log(pageWsDebuggerUrl);
        return await pageWsDebuggerUrl

    }
    //use or start
    this.existingSession = async function (url = ``) {
        //{ headless: false, slowMo: puppeteerSlowMo }

        //this could launch chrome with args then launch chromium headless capture devtools websocket address 
        //then use that or just api call?

        let webSocketDebuggerUrl = await getWsDebuggerUrl(url);

        let browser = await puppeteer.connect({
            headless: false,
            slowMo: puppeteerSlowMo,
            browserWSEndpoint: webSocketDebuggerUrl,
            defaultViewport: { width: 0, height: 0 }
        });

        let currentTabs = await browser.pages();
        let page = currentTabs.find(x => x.url().includes(url));
        return await page

    }

    this.explore = async function (url) {

        let browser = await puppeteer.launch({ headless: false, slowMo: puppeteerSlowMo });
        let page = await browser.newPage();
        // lets page contents take full window
        await page.setViewport({ width: 0, height: 0 });
        await page.goto(url);
        return await page;
    }

    this.withClickTracking = function (page) {
        page.exposeFunction(`prawnClickTracker`, e => {
            console.log(`${e.tag} ${e.name} ${e.value}`);
            page.evaluateHandle(`document.activeElement`)
                .then((value) => {
                    console.log(value._remoteObject.description)
                }).then(() => {
                    let eventType = `pointerDown`;
                    page.evaluateOnNewDocument(eventType => {
                        document.addEventListener(eventType, e => {
                            window.prawnClickTracker({
                                eventType,
                                tag: document.activeElement.tagName,
                                value: document.activeElement.value,
                                name: document.activeElement.name
                            });
                        })
                    })
                })
        })
    }

    this.withConsoleErrorTracking = function (page, reporterFunction) {
        page.on(`console`, msg => {
            if (msg._type === 'error') {
                reporterFunction(msg._text);
            }
        });
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
