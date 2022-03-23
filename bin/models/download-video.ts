import puppeteer from "puppeteer";
import cliProgress from "cli-progress";
import ansi from "ansi-colors";
import Downloader from "nodejs-file-downloader";

export const downloadVideo = async (hrefLink: string, browser: puppeteer.Browser, dirName: string) => {
  const newPage = await browser.newPage();
  await newPage.goto(hrefLink);
  try {
    const file = await newPage.waitForSelector('.link-download')
    const linkVideo = await file.getProperty('href')
    const titleVideo = await file.getProperty('download')
    const resTitle = await titleVideo.jsonValue()

    const progress = new cliProgress.SingleBar({
      format: `Upload Progress: {percentage}% | ${ansi.cyan('{bar}')}`,
      barCompleteChar: '\u2588',
      barIncompleteChar: '\u2591',
      hideCursor: true
    });

    const downloader = new Downloader({
      url: await linkVideo.jsonValue(),
      directory: `./bin/assets/${dirName}/`,
      fileName: resTitle.toString(),
      onProgress: (percentage) => {
        progress.update(+percentage)
        progress.increment();
      },
    })
    progress.start(100, 0)

    await downloader.download();
    progress.stop();
    console.log(ansi.bgBlue(`Video ${resTitle.toString()} saved ...`));
    await newPage.close()
  } catch (err) {
    console.log(ansi.bgRed('Timeout expired, try again...'));
    await newPage.reload({
      timeout: 2000
    })
    await downloadVideo(hrefLink, browser, dirName)
  }
}
