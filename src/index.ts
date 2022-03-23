import puppeteer from "puppeteer";
import {parse} from "node-html-parser";
import * as fs from "fs";
import * as https from "https";


console.log('\x1b[42m%s\x1b[0m', 'Download video started ...');

const link = 'https://www.youtube.com/playlist?list=PLNkWIWHIRwMF2sVLwzRef0Cu5kzAOeRcu';

const saveVideo = async (hrefLink: string, browser: puppeteer.Browser, dirName: string) => {
  const newPage = await browser.newPage();
  await newPage.goto(hrefLink);
  try {
    const file = await newPage.waitForSelector('.link-download')
    const linkVideo = await file.getProperty('href')
    const titleVideo = await file.getProperty('download')
    const resTitle = await titleVideo.jsonValue()
    const pathTitle = fs.createWriteStream(`./src/assets/${dirName}/${await titleVideo.jsonValue()}`)
    await https.get(await linkVideo.jsonValue(), async (res) => {
      await res.pipe(pathTitle);
      pathTitle.on(('finish'), () => {
        pathTitle.close();
        console.log('\x1b[44m%s\x1b[0m', `Video ${resTitle.toString()} saved ...`);
      })
    })
    await newPage.close()
  } catch (err) {
    console.log('\x1b[41m%s\x1b[0m', 'Timeout expired, try again...');
    await newPage.reload({
      timeout: 2000
    })
    await saveVideo(hrefLink, browser, dirName)
  }
}


(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(link);
  const preloadHref = await page.content();
  const root = parse(preloadHref)
  const dirName = root.querySelector('title').childNodes[0].rawText
  fs.mkdirSync(`./src/assets/${dirName}`)
  const allHref = root.querySelectorAll('#thumbnail')
  const hrefArr = []
  allHref.forEach(el => hrefArr.push(el.rawAttributes))
  const href = []
  hrefArr.forEach(el => {
    if (el.href) href.push(`https://www.Ssyoutube.com${el.href}`);
  })
  for (const el of href) {
    const i = href.indexOf(el);
    if (i === 0) {
      await saveVideo(el, browser, dirName);
    }
  }
  await browser.close();
  console.log('\x1b[45m%s\x1b[0m', 'Congratulations, all videos have been downloaded successfully!!!');
})();
