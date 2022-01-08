// const express = require('express');
// // const axios = require('axios');
// // const { parse } = require('node-html-parser');
// const puppeteer = require('puppeteer');
// const path = require('path');
// const fs = require('fs').promises;

// const app = express();
// // (async () => {
// //   try {
// //     const browser = await puppeteer.launch();
// //     const page = await browser.newPage(); //https://learnwebcode.github.io/practice-requests/
// //     await page.goto('https://punchng.com');
// //     // eslint-disable-next-line no-undef
// //     const data = await page.evaluate(() => document.body.innerHTML);
// //     const dom = parse(data);

// //     const heading = dom.querySelector('h1');
// //     // const images = dom.querySelector('img');
// //     // console.log('-------------------------------------');
// //     // console.log(images.getAttribute('src'));
// //     // console.log('-------------------------------------');
// //     const content = dom.querySelectorAll('p').reduce((acc, { text }) => {
// //       console.log(text);
// //       return text;
// //     }, ' \r\n');
// //     console.log(heading.text);
// //     console.log(content);

// //     await browser.close();
// //   } catch (err) {
// //     console.log(err.message);
// //   }
// // })();
// (async () => {
//   try {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto('https://punchng.com/');
//     // await page.goto('https://learnwebcode.github.io/practice-requests/');
//     // To take a screensot of a page
//     // await page.screenshot({ path: 'screenshot.png', fullPage: true }); // setting fullPage to true will take the screenshot of the full page length instead of taking the screenshot of a certain browser window

//     const names = await page.evaluate(() =>
//       // return a list of arrays containing the name of cats on this page
//       // eslint-disable-next-line no-undef
//       [...document.querySelectorAll('.entry-title a')].map((x) => x.textContent)
//     );

//     await fs.writeFile(
//       path.join(__dirname, 'scrapper', 'text', 'headlines.txt'),
//       names.join('\r\n')
//     );

//     const sections = await page.evaluate(() =>
//       // return a list of arrays containing the name of cats on this page
//       // eslint-disable-next-line no-undef
//       [...document.querySelectorAll('.list-item article')].map(
//         (x) => x.textContent
//       )
//     );

//     // const images = await page.evaluate(() =>
//     //   // return a list of arrays containing the name of cats on this page
//     //   // eslint-disable-next-line no-undef
//     //   [...document.querySelectorAll('img')].map((x) => x.src)
//     // );

//     await fs.writeFile(
//       path.join(__dirname, 'scrapper', 'text', 'section-headline.txt'),
//       sections.join('\r\n')
//     );

//     const images = await page.$$eval('img', (imgs) => imgs.map((x) => x.src));
//     for (const image of images) {
//       const imagePage = await page.goto(image);
//       await fs.writeFile(
//         path.join(__dirname, 'scrapper', 'images', `${image.split('/').pop()}`),
//         await imagePage.buffer()
//       );
//     }

//     await browser.close();
//   } catch (err) {
//     console.log(err.message);
//   }
// })();
// module.exports = app;
