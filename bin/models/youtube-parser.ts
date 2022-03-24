import puppeteer from "puppeteer";
import ansi from "ansi-colors";
import {HTMLElement, parse} from "node-html-parser";
import {generateFolder} from "./generate-folder";
import {downloadVideo} from "./download-video";

export const youTubeParser = async (link: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  console.log(ansi.bgYellowBright(`${ansi.black('Youtube page parsing start')}`))
  await page.goto(link);
  const preloadHref = await page.content();
  const root = parse(preloadHref)
  console.log(ansi.bgYellowBright(`${ansi.black('Youtube page parsing completed successfully')}`))

  const dirName = root.querySelector('title').childNodes[0].rawText
  generateFolder(dirName);

  const allHref: HTMLElement[] = root.querySelectorAll('#thumbnail')
  const hrefArr = []
  allHref.forEach(el => hrefArr.push(el.rawAttributes))
  const href = []
  hrefArr.forEach(el => {
    if (el.href) href.push(`https://www.Ssyoutube.com${el.href}`);
  })

  const finallyLinkArray = href.slice(1);
  console.log(ansi.bgGreenBright(ansi.black(`${finallyLinkArray.length} videos found, start download`)))

  for (const el of finallyLinkArray) {
    await downloadVideo(el, browser, dirName);
  }

  await browser.close();
  console.log(ansi.bgMagenta('Congratulations, all videos have been downloaded successfully!!!'));
};
