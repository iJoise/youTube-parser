import {StyleFunction} from "ansi-colors";


export function logger(text: string, textColor: StyleFunction, background?: StyleFunction) {
  if (background && textColor) {
    console.log(background(textColor(`${text}`)));
  } else {
    console.log(textColor(`${text}`));
  }
}

export const youTubeRegexp = /(https:\/\/www\.youtube\.com\/playlist\?list=)[\w\d-]{1,42}/gi;
