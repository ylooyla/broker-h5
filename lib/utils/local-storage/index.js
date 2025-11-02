var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
const SPLIT_STR = "@";
const localStorage = window.localStorage;
const DATA_PROCESS_MAPPING = {
  number: {
    save: (data) => data,
    parse: (data) => Number.parseFloat(data)
  },
  boolean: {
    save: (data) => data,
    parse: (data) => JSON.parse(data)
  },
  object: {
    save: (data) => JSON.stringify(data),
    parse: (data) => JSON.parse(data)
  },
  default: {
    save: (data) => data,
    parse: (data) => data
  }
};
function getProcess(type) {
  return DATA_PROCESS_MAPPING[type] || DATA_PROCESS_MAPPING.default;
}
var stdin_default = {
  get(key) {
    try {
      const stringData = localStorage.getItem(key);
      if (stringData) {
        const dataArray = stringData.split(SPLIT_STR);
        let data;
        const now = Date.now();
        if (dataArray.length > 2 && Number(dataArray[2]) < now) {
          localStorage.removeItem(key);
          return null;
        } else {
          const value = decodeURIComponent(dataArray[1]);
          data = getProcess(dataArray[0]).parse(value);
          return data;
        }
      }
    } catch (e) {
      console.log(e);
    }
    return null;
  },
  put(key, value, expired) {
    const type = typeof value;
    const process = getProcess(type);
    let storedValue = type + SPLIT_STR + encodeURIComponent(process.save(value));
    if (expired) {
      const time = expired * 24 * 60 * 60 * 1e3 + new Date().getTime();
      storedValue += SPLIT_STR + time;
    }
    localStorage.setItem(key, storedValue);
  },
  clear() {
    localStorage.clear();
  },
  remove(key) {
    localStorage.removeItem(key);
  }
};
