import fs from "fs";
import {bgMagenta} from "ansi-colors";
import {logger} from "../helpers";

export const generateFolder = (dirName: string) => {
  if (!fs.existsSync('./bin/assets')) {
    fs.mkdirSync('./bin/assets');
  }
  const path = `./bin/assets/${dirName}`;
  try {
    fs.mkdirSync(path)
  } catch (err) {
    fs.rmSync(path, {recursive: true, force: true})
    fs.mkdirSync(path)
  }
  logger(`folder created ${dirName}`, bgMagenta)
}
