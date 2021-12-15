const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(
      'https://www.uplead.com/reviews/code-red-safety-case-study/'
    );
    // To take a screensot of a page
    await page.screenshot({ path: 'screenshot.png', fullPage: true }); // setting fullPage to true will take the screenshot of the full page length instead of taking the screenshot of a certain browser window
    await browser.close();
  } catch (err) {
    console.log(err.message);
  }
})();
module.exports = app;
