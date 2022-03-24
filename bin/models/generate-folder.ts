import fs from "fs";
import ansi, {bgMagenta} from "ansi-colors";
import {logger} from "../helpers";

export const generateFolder = (dirName: string) => {
  const path = `./bin/assets/${dirName}`;
  try {
    fs.mkdirSync(path)
  } catch (err) {
    fs.rmSync(path, {recursive: true, force: true})
    fs.mkdirSync(path)
  }
  logger(`folder created ${dirName}`, bgMagenta)
}
