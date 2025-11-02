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
  APP_NAME: () => APP_NAME,
  APP_NAME_TYPE: () => APP_NAME_TYPE,
  appType: () => appType,
  appVersion: () => appVersion,
  channelId: () => channelId,
  getLangType: () => getLangType,
  getStockColorType: () => getStockColorType,
  getUaValue: () => getUaValue,
  isAndroid: () => isAndroid,
  isIOS: () => isIOS,
  isSgApp: () => isSgApp,
  isWeixin: () => isWeixin,
  isYingliPc: () => isYingliPc,
  isYouxinAndroid: () => isYouxinAndroid,
  isYouxinApp: () => isYouxinApp,
  isYouxinIos: () => isYouxinIos,
  lang: () => lang,
  langType: () => langType,
  platform: () => platform,
  setTitle: () => setTitle,
  usStockTradeClose: () => usStockTradeClose
});
module.exports = __toCommonJS(stdin_exports);
const getUaValue = (key) => {
  function getUrlParam(name) {
    const RegExpObject = new RegExp(
      "[?&]" + encodeURIComponent(name) + "=([^&|#]*)"
    );
    if (name = RegExpObject.exec(window.location.href))
      return decodeURIComponent(name[1]);
  }
  const reg = new RegExp(`(^|\\s)${key}\\/[^\\s]+`);
  const match = navigator.userAgent.match(reg);
  let value = match ? match[0].split("/")[1] : getUrlParam(key);
  value = value || "";
  return value;
};
const APP_NAME_TYPE = {
  1e3: "fins",
  1001: "mte",
  1002: "mercury",
  1003: "ta",
  1004: "gc",
  1005: "dcmsg",
  1010: "aei"
};
const langMap = /* @__PURE__ */ new Map([
  ["1", "zhCHS"],
  ["2", "zhCHT"],
  ["3", "en"],
  ["4", "ms"],
  ["5", "th"],
  ["6", "ja"]
]);
function getAppName() {
  const hostname = window.location.hostname;
  const isLocal = !hostname.includes("feisima");
  if (appType || isLocal) {
    return APP_NAME_TYPE[appType] || "mte";
  }
  const broker = hostname.split("-")[0];
  return Object.values(APP_NAME_TYPE).includes(broker) ? broker : "mte";
}
const isIOS = /(ipad)|(iphone)/i.test(navigator.userAgent);
const isAndroid = /android/i.test(navigator.userAgent);
const isYouxinApp = /yxzq/i.test(navigator.userAgent);
const isYouxinAndroid = /yxzq-android/i.test(navigator.userAgent);
const isYouxinIos = /yxzq-ios/i.test(navigator.userAgent);
const isWeixin = /micromessenger/i.test(navigator.userAgent);
const isSgApp = getUaValue("overseaType") === "sg";
const usStockTradeCloseValue = getUaValue("usStockTradeClose");
const usStockTradeClose = usStockTradeCloseValue === "1";
const appType = getUaValue("appType");
const channelId = getUaValue("channelId") || "";
const appVersion = getUaValue("appVersion");
const platform = getUaValue("platform");
const isYingliPc = platform === "yl-pc";
const APP_NAME = getAppName();
const lang = langMap.get(getUaValue("langType")) || "zhCHS";
const langTypeRS = getUaValue("langType");
const langType = {
  Ch: langTypeRS === "1",
  Hk: langTypeRS === "2",
  En: langTypeRS === "3",
  Ms: langTypeRS === "4",
  Th: langTypeRS === "5",
  Ja: langTypeRS === "6"
};
const setTitle = (title) => {
  document.title = title;
  if (/(ipad)|(iphone)/i.test(navigator.userAgent)) {
    const i = document.createElement("iframe");
    i.src = "/favicon.ico";
    i.style.display = "none";
    i.onload = function() {
      setTimeout(function() {
        i.remove();
      });
    };
    document.body.appendChild(i);
  }
};
const getLangType = () => {
  return getUaValue("langType") || "3";
};
const getStockColorType = () => {
  const lang2 = getLangType();
  return getUaValue("stockColorType") || (+lang2 === 1 ? "1" : "2");
};
