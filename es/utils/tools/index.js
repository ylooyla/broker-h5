import { jsBridge } from "../../plugins/js-bridge";
import { isIOS, isYouxinApp } from "../html-utils";
function camelize(str) {
  return str.replace(/-(\w)/g, (_, c) => c.toUpperCase());
}
function guid() {
  let d = Date.now();
  if (typeof performance !== "undefined" && typeof performance.now === "function") {
    d += performance.now();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : r & 3 | 8).toString(16);
  });
}
function getParameter(name) {
  const RegExpObject = new RegExp(
    "[?&]" + encodeURIComponent(name) + "=([^&#]*)"
  );
  const matchObj = RegExpObject.exec(window.location.href);
  if (matchObj)
    return decodeURIComponent(matchObj[1]);
  return void 0;
}
const debounce = (fn, delay) => {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};
const throttle = (fn, delay) => {
  let timer = null;
  return function(...args) {
    if (!timer) {
      fn.apply(this, args);
      timer = setTimeout(() => {
        clearTimeout(timer);
        timer = null;
      }, delay);
    }
  };
};
function compareVersion(v1, v2) {
  const v1_arr = v1.split(".").map((i) => parseInt(i));
  const v2_arr = v2.split(".").map((i) => parseInt(i));
  const maxLength = Math.max(v1_arr.length, v2_arr.length);
  for (let i = 0; i < maxLength; i++) {
    if (v1_arr[i] === void 0)
      return -1;
    if (v2_arr[i] === void 0)
      return 1;
    if (v1_arr[i] > v2_arr[i])
      return 1;
    if (v1_arr[i] < v2_arr[i])
      return -1;
  }
  return 0;
}
function isMobile() {
  const ua = navigator.userAgent.toLowerCase();
  return /(iphone|ipad|opera mini|android.*mobile|netfront|psp|blackberry|windows phone)/gi.test(
    ua
  );
}
function setSeo() {
  const target = document.querySelector("head");
  const script = document.createElement("script");
  const body = document.querySelector("body");
  script.innerHTML = `
            (function (w, d, s, l, i) {
                w[l] = w[l] || [];
                w[l].push({
                    'gtm.start': new Date().getTime(),
                    event: 'gtm.js'
                });
                var f = d.getElementsByTagName(s)[0],
                    j = d.createElement(s),
                    dl = l != 'dataLayer' ? '&l=' + l : '';
                j.async = true;
                j.src =
                    'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
                f.parentNode.insertBefore(j, f);
            })(window, document, 'script', 'dataLayer', 'GTM-WMC66WB');
    `;
  target == null ? void 0 : target.appendChild(script);
  const noScriptTag = document.createElement("noscript");
  const iframe = document.createElement("iframe");
  iframe.src = "https://www.googletagmanager.com/ns.html?id=GTM-WMC66WB";
  iframe.height = "0px";
  iframe.width = "0px";
  noScriptTag.appendChild(iframe);
  body == null ? void 0 : body.appendChild(noScriptTag);
}
function insertParam(url, str) {
  let callbackUrl = decodeURIComponent(url);
  const regRs = /\.html\?/.exec(callbackUrl);
  if (regRs && regRs.index > -1) {
    let hashIndex = callbackUrl.indexOf("#");
    let paramIndex = regRs.index + 6;
    let paramStr = callbackUrl.substr(paramIndex, hashIndex - paramIndex);
    const paramKeys = [];
    paramStr.split("&").forEach((item) => {
      paramKeys.push(item.split("=")[0]);
    });
    const strArr = str.split("&");
    const strKeys = [];
    const strValues = [];
    strArr.forEach((item) => {
      strKeys.push(item.split("=")[0]);
      strValues.push(item.split("=")[1]);
    });
    for (let i = 0; i < strKeys.length; i++) {
      if (paramKeys.includes(`${strKeys[i]}`)) {
        const reg = new RegExp(`${strKeys[i]}=[^#|&]*`);
        callbackUrl = callbackUrl.replace(reg, `${strKeys[i]}=${strValues[i]}`);
        hashIndex = callbackUrl.indexOf("#");
        paramIndex = regRs.index + 6;
        paramStr = callbackUrl.substr(paramIndex, hashIndex - paramIndex);
      } else {
        callbackUrl = callbackUrl.replace(paramStr, `${paramStr}&${strArr[i]}`);
      }
    }
    return callbackUrl;
  }
  return callbackUrl.replace(".html", `.html?${str}`);
}
function convertImgToBase64(url, callback, outputFormat) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.crossOrigin = "www";
  img.onload = function() {
    canvas.height = img.height;
    canvas.width = img.width;
    ctx == null ? void 0 : ctx.drawImage(img, 0, 0);
    const dataURL = canvas.toDataURL(outputFormat || "image/png");
    callback.call(this, dataURL);
  };
  img.src = url;
}
function thousandsFormat(priceVal, n = 2) {
  if (priceVal) {
    priceVal = Number(priceVal).toFixed(n);
    return priceVal.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,");
  } else if (priceVal === 0 || priceVal === "0") {
    return n ? "0." + "0".repeat(n) : "0";
  } else {
    return "";
  }
}
function deepCopy(obj) {
  if (!obj || typeof obj !== "object") {
    throw new Error("error params");
  }
  const deepObject = Array.isArray(obj) ? [] : {};
  for (const attr in obj) {
    if (obj.hasOwnProperty(attr)) {
      if (obj[attr] && typeof obj[attr] === "object") {
        deepObject[attr] = deepCopy(obj[attr]);
      } else {
        deepObject[attr] = obj[attr];
      }
    }
  }
  return deepObject;
}
const goProtocol = (key) => {
  if (jsBridge.isYouxinApp) {
    jsBridge.gotoNewWebview(
      window.location.origin + `/webapp/market/generator.html?key=${key}`
    );
  } else {
    window.location.href = window.location.origin + `/webapp/market/generator.html?key=${key}`;
  }
};
const downloadFile = (url, filename = "") => {
  if (isIOS) {
    if (isYouxinApp) {
      jsBridge.gotoNewWebview(url);
      return;
    }
    window.location.href = url;
    return;
  }
  const a = document.createElement("a");
  a.download = filename;
  a.target = "_blank";
  a.href = url;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
function isElementInViewport(el) {
  if (!el) {
    return false;
  }
  const rect = el.getBoundingClientRect();
  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
}
export {
  camelize,
  compareVersion,
  convertImgToBase64,
  debounce,
  deepCopy,
  downloadFile,
  getParameter,
  goProtocol,
  guid,
  insertParam,
  isElementInViewport,
  isMobile,
  setSeo,
  thousandsFormat,
  throttle
};
