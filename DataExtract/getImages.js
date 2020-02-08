const puppeteer = require('puppeteer');
const urls = require('./files.json');
const fs = require('fs');

let counter =0;
(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://myreadingmanga.info/genre/bara/');
  await page.waitFor(10000);

  for(i=0; i<urls.length;i++){
    for(j=0;j<urls[i].length;j++){
      console.log(`Processing ${i} of ${urls.length}`)
      url = urls[i][j];

      page.goto(url,{waitUntil: "networkidle2"});

      await page.waitFor(500);

      let counter = 0;
      page.on('response', async (response) => {
        const matches = /.*\.(jpg|png|svg|gif)$/.exec(response.url());
        if (matches && (matches.length === 2)) {
          const extension = matches[1];
          const buffer = await response.buffer();
          fs.writeFileSync(`images/image-${counter}.${extension}`, buffer, 'base64');
          counter += 1;
        }
      });

      await autoScroll(page);
    }
  }
  browser.close()
})();

async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 300;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 10);
        });
    });
}
