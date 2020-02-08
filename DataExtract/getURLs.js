const puppeteer = require('puppeteer');
const fs = require('fs');

let storyUrls = [];

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://myreadingmanga.info/genre/bara/');
  await page.waitFor(6000)

  do {
    let urls = await page.evaluate(() => Array.from(document.querySelectorAll(".entry-image-link"), element => element.getAttribute('href')));
    storyUrls.push(urls);
    next = await page.$('.pagination-next a', {timeout: 3000})
    if(next) {
      next.click()
      await page.waitFor(600)
    }
  }
  while(next)

  fs.writeFile ("files.json", JSON.stringify(storyUrls), function(err) {
      if (err) throw err;
      console.log('complete');
      }
  );

  console.log(storyUrls)

})();
