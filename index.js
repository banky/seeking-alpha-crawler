const puppeteer = require("puppeteer");
require("dotenv").config();

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://seekingalpha.com/");

  await page.$eval("[data-test-id='header-button-sign-in']", (el) =>
    el.click()
  );

  await page.focus("[name='email']");
  await page.keyboard.type(process.env.EMAIL);

  await page.focus("[name='password']");
  await page.keyboard.type(process.env.PASSWORD);

  await page.$eval("[type='submit']", (el) => el.click());

  await page.waitForSelector("[data-test-id='header-button-pro']");
  await page.screenshot({ path: "logged-in.png" });

  await browser.close();
})();
