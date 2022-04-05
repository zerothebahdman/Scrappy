const puppeteer = require('puppeteer');
const { log } = require('console');

async function scrape() {
  let browser;
  try {
    log('Oppening browser...');
    browser = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      ignoreHTTPSErrors: true,
    });
  } catch (err) {
    log('Could not create a browser instance => : ', err);
  }
  return browser;
}

module.exports = { scrape };
