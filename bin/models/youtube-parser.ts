import puppeteer from "puppeteer";
import {bgGreenBright, bgMagenta, bgYellowBright, black} from "ansi-colors";
import {HTMLElement, parse} from "node-html-parser";
import {generateFolder} from "./generate-folder";
import {downloadVideo} from "./download-video";
import {logger} from "../helpers";

export const youTubeParser = async (link: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  logger('Youtube page parsing start', black, bgYellowBright);
  await page.goto(link);
  const preloadHref = await page.content();
  const root = parse(preloadHref);
  logger('Youtube page parsing completed successfully', black, bgYellowBright);

  const dirName = root.querySelector('title').childNodes[0].rawText;
  generateFolder(dirName);

  const allHref: HTMLElement[] = root.querySelectorAll('#thumbnail');
  const hrefArr = []
  allHref.forEach(el => hrefArr.push(el.rawAttributes));
  const href = [];
  hrefArr.forEach(el => {
    if (el.href) href.push(`https://www.Ssyoutube.com${el.href}`);
  });

  const finallyLinkArray = href.slice(1);
  logger(`${finallyLinkArray.length} videos found, start download`, black, bgGreenBright)

  for (const el of finallyLinkArray) {
    await downloadVideo(el, browser, dirName);
  }

  await browser.close();
  logger('Congratulations, all videos have been downloaded successfully!!!', bgMagenta);
};
