#!/usr/bin/env ts-node
import ansi from 'ansi-colors';
import readlineSync from "readline-sync";
import {youTubeParser} from "./models/youtube-parser";

const link = readlineSync.question(
  `${ansi.bgYellowBright(ansi.black('Enter playlist url: '))}`,
  {
    keepWhitespace: false
  })

console.log(ansi.bgGreen('Download video started ...'));

youTubeParser(link);
