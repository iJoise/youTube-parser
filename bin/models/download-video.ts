import puppeteer from "puppeteer";
import cliProgress from "cli-progress";
import ansi, {bgBlue, bgRed} from "ansi-colors";
import Downloader from "nodejs-file-downloader";
import {logger} from "../helpers";

export const downloadVideo = async (hrefLink: string, browser: puppeteer.Browser, dirName: string) => {
  const newPage = await browser.newPage();
  await newPage.goto(hrefLink);
  try {
    const file = await newPage.waitForSelector('.link-download')
    const linkVideo = await file.getProperty('href')
    const titleVideo = await file.getProperty('download')
    const resTitle = await titleVideo.jsonValue()

    const progress = new cliProgress.SingleBar({
      format: `Download Progress: {percentage}% | ${ansi.cyan('{bar}')}`,
      barCompleteChar: '\u2588',
      barIncompleteChar: '\u2591',
      hideCursor: true
    });
    progress.start(100, 0);

    const downloader = new Downloader({
      url: await linkVideo.jsonValue(),
      directory: `./bin/assets/${dirName}/`,
      fileName: resTitle.toString(),
      onProgress: (percentage) => {
        progress.update(+percentage)
        progress.increment();
      },
    });


    await downloader.download();
    progress.stop();
    logger(`Video ${resTitle.toString()} saved...`, bgBlue);
    await newPage.close()
  } catch (err) {
    logger('Timeout expired, try again...', bgRed);
    await newPage.reload({
      timeout: 2000
    })
    await downloadVideo(hrefLink, browser, dirName)
  }
}
