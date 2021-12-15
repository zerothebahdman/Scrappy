const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://learnwebcode.github.io/practice-requests');
  // To take a screensot of a page
  await page.screenshot({ path: 'screenshot.png' });
  await browser.close();
})();
module.exports = app;
