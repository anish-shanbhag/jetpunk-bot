const puppeteer = require("puppeteer");
const password = require("password");

(async () => {
    console.log("FDSA")
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.jetpunk.com");
    await page.waitFor("div.nav-button.login-link > a");
    await page.click("div.nav-button.login-link > a");
    await page.waitFor("div.input-block > input[type=text]:nth-child(2)");
    await page.type("div.input-block > input[type=text]:nth-child(2)", "anishbot");
    await page.type("#txt-password", password);
    await page.click("div.overlay > div > div > button");
    await page.waitFor("#close-alert");
    await page.click("#close-alert");
    await page.waitFor("div.left-nav > div:nth-child(2) > a");
    await page.click("div.left-nav > div:nth-child(2) > a");
    await browser.close();
})();