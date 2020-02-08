const puppeteer = require('puppeteer');
const urls = require('./files.json');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://myreadingmanga.info/genre/bara/');
  await page.waitFor(10000);
  first = true;

  for(i=0; i<urls.length;i++){
    for(j=0;j<urls[i].length;j++){
      url = urls[i][j];
      page.goto(url);
      await page.waitForNavigation();
      await page.waitFor(1000);
      let image_urls = await page.evaluate(() => Array.from(document.querySelectorAll(".img-myreadingmanga"), element => element.getAttribute('src')));
      console.log(image_urls);
    }


  }
})();
