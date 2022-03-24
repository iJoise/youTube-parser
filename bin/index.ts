#!/usr/bin/env ts-node
import ansi from 'ansi-colors';
import readlineSync from "readline-sync";
import {youTubeParser} from "./models/youtube-parser";
import {youTubeRegexp} from "./helpers";


(function parserInitialization() {
  const link = readlineSync.question(ansi.yellowBright('Enter playlist url: '), {
    keepWhitespace: false
  })

  console.log(ansi.bgGreen('Download video started ...'));

  if (youTubeRegexp.test(link)) {
    youTubeParser(link);
  } else {
    console.log(ansi.red('Incorrect url format'));
    console.log(ansi.red(`For example: ${ansi.blue('https://www.youtube.com/playlist?list=PLiZoB8JBsdznY1XwBcBhHL9L7S_shPGVE')}`));
    parserInitialization()
  }
})()

