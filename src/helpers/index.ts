export function debug(obj = {}) {
   return JSON.stringify(obj, null, 4);
}

export function sleep(ms: number) {
   return new Promise(resolve => setTimeout(resolve, ms));
}
