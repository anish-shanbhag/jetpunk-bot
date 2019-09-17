const puppeteer = require("puppeteer");
const password = require("./password");

(async () => {
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
  while (true) {
    await page.click("div.left-nav > div:nth-child(2) > a");
    try {
      await page.waitFor(".answer-display div", {
        timeout: 1000
      });
      await page.waitFor(100);
      const answers = await page.$$eval(".answer-display div", divs => divs.map(div => {
        const blank = div.querySelector("span span");
        return blank ? blank.textContent : div.textContent;
      }));
      await page.click("#start-button");
      await page.waitFor(() => document.querySelector("#quiz-controls :nth-child(2)").style.display !== "none", {
        timeout: 1000
      });
      await page.waitFor(100);
      const questions = await page.$eval("#current-score :nth-child(2)", div => div.textContent.split(String.fromCharCode(160))[2].split(" ")[0]);
      if (answers.length != questions) continue;
      for (const answer of answers) {
        await page.type("#txt-answer-box", answer);
        await page.evaluate(() => {
          document.querySelector("#txt-answer-box").value = "";
        });
      }
      try {
        await page.waitFor("#new-level-modal .close", {
          timeout: 1000
        });
        await page.click("#new-level-modal .close");
      } catch {}
      await page.waitFor("#post-game-boxes");
    } catch (e) {
      continue;
    }
  }
})();