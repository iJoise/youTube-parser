import fs from "fs";
import ansi from "ansi-colors";

export const generateFolder = (dirName: string) => {
  const path = `./bin/assets/${dirName}`;
  try {
    fs.mkdirSync(path)
  } catch (err) {
    fs.rmSync(path, {recursive: true, force: true})
    fs.mkdirSync(path)
  }
  console.log(ansi.bgMagenta(`folder created ${dirName}`))
}
