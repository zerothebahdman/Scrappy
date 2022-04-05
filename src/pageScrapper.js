/* eslint-disable guard-for-in */
const scraperObject = {
  url: 'https://punchng.com/',
  async scraper(browser) {
    const page = await browser.newPage();
    console.log(`Navigating to ${this.url}...`);
    await page.goto(this.url, { waitUntil: 'load', timeout: 0 });
    const scrapedData = [];
    async function scrapeCurrentPage() {
      await page.waitForSelector('.site-content');
      const urls = await page.$$eval('section ol > li', (links) => {
        // Make sure the book to be scraped is in stock
        links = links.filter(
          (link) =>
            link.querySelector('.instock.availability > i').textContent !==
            'In stock'
        );
        // Extract the links from the data
        links = links.map((el) => el.querySelector('h3 > a').href);
        return links;
      });

      // Loop through each of those links, open a new page instance and get the relevant data from thems
      const pagePromise = (link) =>
        // eslint-disable-next-line no-async-promise-executor
        new Promise(async (resolve) => {
          const dataObj = {};
          const newPage = await browser.newPage();
          await newPage.goto(link, { waitUntil: 'load', timeout: 0 });
          dataObj.bookTitle = await newPage.$eval(
            '.product_main > h1',
            (text) => text.textContent
          );
          dataObj.bookPrice = await newPage.$eval(
            '.price_color',
            (text) => text.textContent
          );
          dataObj.noAvailable = await newPage.$eval(
            '.instock.availability',
            (text) => {
              // Strip new line and tab spaces
              text = text.textContent.replace(/(\r\n\t|\n|\r|\t)/gm, '');
              // Get the number of stock available
              const regexp = /^.*\((.*)\).*$/i;
              const stockAvailable = regexp.exec(text)[1].split(' ')[0];
              return stockAvailable;
            }
          );
          dataObj.imageurls = await newPage.$eval(
            '#product_gallery img',
            (img) => img.src
          );
          dataObj.bookDescription = await newPage.$eval(
            '#product_description',
            (div) => div.nextSibling.nextSibling.textContent
          );
          dataObj.upc = await newPage.$eval(
            '.table.table-striped > tbody > tr > td',
            (table) => table.textContent
          );
          resolve(dataObj);
          await newPage.close();
        });

      // eslint-disable-next-line no-restricted-syntax
      for (const link in urls) {
        // eslint-disable-next-line no-await-in-loop
        const currentPageData = await pagePromise(urls[link]);
        scrapedData.push(currentPageData);
        console.log(currentPageData);
      }
      // When all the data on this page is done, click the next button and start the scraping of the next page
      // You are going to check if this button exist first, so you know if there really is a next page.
      let nextButtonExist = false;
      try {
        const nextButton = await page.$eval('.next > a', (a) => a.textContent);
        nextButtonExist = true;
      } catch (err) {
        nextButtonExist = false;
      }
      if (nextButtonExist) {
        await page.click('.next > a');
        return scrapeCurrentPage(); // Call this function recursively
      }
      await page.close();
      return scrapedData;
    }

    const data = await scrapeCurrentPage();
    console.log(data);
    return data;
  },
};

module.exports = scraperObject;
