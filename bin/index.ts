#!/usr/bin/env ts-node
import {bgGreen, red, yellowBright} from 'ansi-colors';
import readlineSync from "readline-sync";
import {youTubeParser} from "./models/youtube-parser";
import {logger, youTubeRegexp} from "./helpers";


(function parserInitialization() {
  const link = readlineSync.question(yellowBright('Enter playlist url: '), {
    keepWhitespace: false
  })


  if (youTubeRegexp.test(link)) {
    logger('Download video started ...', bgGreen);
    youTubeParser(link);
  } else {
    logger('Incorrect url format', red);
    logger(`For example: https://www.youtube.com/playlist?list=PLiZoB8JBsdznY1XwBcBhHL9L7S_shPGVE`, red);
    parserInitialization()
  }
})()

