var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
const ORIGIN = window.location.origin;
const PROTOCOL = window.location.protocol;
const HOSTNAME = window.location.hostname;
let envName = "PROD";
if (HOSTNAME.startsWith("localhost") || HOSTNAME.startsWith("127.0.0.1") || HOSTNAME.startsWith("10.210")) {
  envName = "LOCAL";
} else if (HOSTNAME.includes("-dev")) {
  envName = "DEV";
} else if (HOSTNAME.includes("-sit")) {
  envName = "SIT";
} else if (HOSTNAME.includes("-uat")) {
  envName = "UAT";
}
const Environment = {
  IS_LOCAL: envName === "LOCAL",
  IS_DEV: envName === "DEV",
  IS_SIT: envName === "SIT",
  IS_UAT: envName === "UAT",
  IS_PROD: envName === "PROD"
};
const ENV = envName;
const isMatchingSystem = (keywords, appName2) => {
  return keywords.some((keyword) => HOSTNAME.includes(keyword)) || process.env.VUE_APP_NAME === appName2;
};
const SYSTEM = {
  FINS: isMatchingSystem(["fins-"], "fins"),
  FINSMART: isMatchingSystem(["finsmart."], "finsmart"),
  MTE: isMatchingSystem(["mtesecurities.", "mte-"], "mte"),
  MERCURY: isMatchingSystem(["mercury-"], "mercury"),
  TA: isMatchingSystem(["ta-"], "ta"),
  GC: isMatchingSystem(["GCSECINT", "gcsecint", "gc-", "capforce-"], "gc"),
  DCMSG: isMatchingSystem(["dcmsg-"], "dcmsg"),
  AEI: isMatchingSystem(["aei-"], "aei")
};
const IS_FINS = SYSTEM.FINS;
const IS_FINSMART = SYSTEM.FINSMART;
const IS_MTE = SYSTEM.MTE;
const IS_MERCURY = SYSTEM.MERCURY;
const IS_TA = SYSTEM.TA;
const IS_GC = SYSTEM.GC;
const IS_DCMSG = SYSTEM.DCMSG;
const IS_AEI = SYSTEM.AEI;
const APP_TYPES = {
  FINS: 1e3,
  MTE: 1001,
  MERCURY: 1002,
  TA: 1003,
  GC: 1004,
  DCMSG: 1005,
  AEI: 1010
};
const APP_TYPE_KEY_MAP = Object.keys(APP_TYPES).reduce((map, key) => {
  map[APP_TYPES[key]] = key.toLowerCase();
  return map;
}, {});
const getAppType = () => {
  if (SYSTEM.MTE)
    return APP_TYPES.MTE;
  if (SYSTEM.MERCURY)
    return APP_TYPES.MERCURY;
  if (SYSTEM.TA)
    return APP_TYPES.TA;
  if (SYSTEM.GC)
    return APP_TYPES.GC;
  if (SYSTEM.FINS)
    return APP_TYPES.FINS;
  if (SYSTEM.DCMSG)
    return APP_TYPES.DCMSG;
  if (SYSTEM.AEI)
    return APP_TYPES.AEI;
  return APP_TYPES.MERCURY;
};
const getAppName = () => {
  for (const [key, value] of Object.entries(SYSTEM)) {
    if (value) {
      return key.toLowerCase();
    }
  }
  return "";
};
const appType = getAppType();
const appName = getAppName();
const getMHost = (env) => {
  if (IS_FINSMART) {
    return env === "UAT" ? "m-uat.finsmart.sg" : "m.finsmart.sg";
  }
  const SUFFIX_MAP = {
    LOCAL: "m-uat.feisima.com",
    UAT: "m-uat.feisima.com",
    PROD: "m.feisima.com"
  };
  const hostSuffix = SUFFIX_MAP[env];
  const hostPrefix = APP_TYPE_KEY_MAP[appType];
  return `${hostPrefix}-${hostSuffix}`;
};
const getBucketEnv = () => {
  const BUCKETENVMap = {
    uat: Environment.IS_UAT || Environment.IS_LOCAL,
    prd: Environment.IS_PROD
  };
  for (const key in BUCKETENVMap) {
    if (BUCKETENVMap[key]) {
      return key;
    }
  }
  return "prd";
};
const BUCKET_ENV = getBucketEnv();
const MAP_API = {
  LOCAL: {
    ADMIN: ORIGIN + "/proxy-admin-host",
    HZ: ORIGIN + "/proxy-hz-host",
    HZ_OPEN: ORIGIN + "/proxy-hz_open-host",
    OPEN: ORIGIN + "/proxy-open-host",
    MH: `${PROTOCOL}//${getMHost("UAT")}`,
    FINSMART_BUCKET: `web-static-finsmart-uat-1319870113.cos.accelerate.myqcloud.com`,
    FINSMART_BUCKET_PRIVATE: `web-finsmart-uat-1319870113.cos.accelerate.myqcloud.com`,
    BUCKET: `web-static-${IS_FINSMART ? "finsmart" : "mte"}-uat-1319870113.cos.accelerate.myqcloud.com`,
    BUCKET_PRIVATE: `web-${IS_FINSMART ? "finsmart" : "mte"}-uat-1319870113.cos.accelerate.myqcloud.com`
  },
  UAT: {
    ADMIN: ORIGIN,
    HZ: `${PROTOCOL}//hz-uat.finsmart.sg`,
    HZ_OPEN: `${PROTOCOL}//open-hz-uat.finsmart.sg`,
    OPEN: `${PROTOCOL}//open-uat.finsmart.sg`,
    MH: `${PROTOCOL}//${getMHost("UAT")}`,
    FINSMART_BUCKET: `web-static-finsmart-uat-1319870113.cos.accelerate.myqcloud.com`,
    FINSMART_BUCKET_PRIVATE: `web-finsmart-uat-1319870113.cos.accelerate.myqcloud.com`,
    BUCKET: `web-static-${IS_FINSMART ? "finsmart" : "mte"}-uat-1319870113.cos.accelerate.myqcloud.com`,
    BUCKET_PRIVATE: `web-${IS_FINSMART ? "finsmart" : "mte"}-uat-1319870113.cos.accelerate.myqcloud.com`
  },
  PROD: {
    ADMIN: ORIGIN,
    HZ: `${PROTOCOL}//hz.feisima.com`,
    HZ_OPEN: `${PROTOCOL}//hz-open.feisima.com:8443`,
    OPEN: `${PROTOCOL}//open.finsmart.sg`,
    MH: `${PROTOCOL}//${getMHost("PROD")}`,
    FINSMART_BUCKET: `web-static-finsmart-prd-1319870113.cos.accelerate.myqcloud.com`,
    FINSMART_BUCKET_PRIVATE: `web-finsmart-prd-1319870113.cos.accelerate.myqcloud.com`,
    BUCKET: `web-static-${IS_FINSMART ? "finsmart" : APP_TYPE_KEY_MAP[appType]}-prd-1319870113.cos.accelerate.myqcloud.com`,
    BUCKET_PRIVATE: `web-${IS_FINSMART ? "finsmart" : APP_TYPE_KEY_MAP[appType]}-prd-1319870113.cos.accelerate.myqcloud.com`
  }
};
console.log("broker-h5 ENV==>", ENV);
console.log("broker-h5 appType", appType);
console.log("broker-h5  appName", appName);
console.log("broker-h5 MAP_API:", MAP_API);
console.log("broker-h5 API_BASE_URL", MAP_API[ENV]);
const API_BASE_URL = MAP_API[ENV];
var stdin_default = __spreadProps(__spreadValues({}, Environment), {
  MAP_API,
  API_BASE_URL,
  IS_FINS,
  IS_FINSMART,
  IS_MTE,
  IS_MERCURY,
  IS_TA,
  IS_GC,
  IS_DCMSG,
  IS_AEI,
  appType,
  appName,
  ENV,
  BUCKET_ENV,
  SYSTEM
});
export {
  API_BASE_URL,
  BUCKET_ENV,
  ENV,
  IS_AEI,
  IS_DCMSG,
  IS_FINS,
  IS_FINSMART,
  IS_GC,
  IS_MERCURY,
  IS_MTE,
  IS_TA,
  SYSTEM,
  appName,
  appType,
  stdin_default as default
};
