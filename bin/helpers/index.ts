export function debug(obj = {}) {
   return JSON.stringify(obj, null, 4);
}

export function sleep(ms: number) {
   return new Promise(resolve => setTimeout(resolve, ms));
}

export const youTubeRegexp = /(https:\/\/www\.youtube\.com\/playlist\?list=)[\w\d-]{1,42}/gi;
