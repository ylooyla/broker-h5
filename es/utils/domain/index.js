import { APP_NAME } from "../html-utils/index";
const { protocol, host, hostname, port } = window.location;
const ORIGIN = `${protocol}//${hostname}${port && ":" + port}`;
let ENV = "PRO";
const ENV_MAP = {
  LOCAL: "10.210",
  DEV: "-dev",
  SIT: "-sit",
  UAT: "-uat"
};
Object.keys(ENV_MAP).forEach((key) => {
  if (key === "LOCAL") {
    ENV = host.includes(ENV_MAP[key]) || host.includes("localhost") ? key : ENV;
  } else {
    ENV = host.includes(ENV_MAP[key]) ? key : ENV;
  }
});
const isPro = ENV === "PRO";
const getDomain = (appName, environment) => {
  const BROKER_NAME = appName;
  const domains = {
    LOCAL: {
      JY: ORIGIN + "/proxy-jy-host",
      HZ: ORIGIN + "/proxy-hz-host",
      BUCKET: `web-mte-uat-1319870113.cos.accelerate.myqcloud.com`,
      BUCKET_PRIVATE: `web-static-mte-uat-1319870113.cos.accelerate.myqcloud.com`,
      M: `http://${BROKER_NAME}-m-uat.feisima.com`,
      ADMIN: `http://${BROKER_NAME}-admin-uat.feisima.com`
    },
    DEV: {
      JY: `${protocol}//${BROKER_NAME}-jy-uat.feisima.com`,
      HZ: `${protocol}//hz-uat.finsmart.sg`,
      BUCKET: `web-${BROKER_NAME}-uat-1319870113.cos.accelerate.myqcloud.com`,
      BUCKET_PRIVATE: `web-static-${BROKER_NAME}-uat-1319870113.cos.accelerate.myqcloud.com`,
      M: `${protocol}//${BROKER_NAME}-m-uat.feisima.com`,
      ADMIN: `${protocol}//${BROKER_NAME}-admin-uat.feisima.com`
    },
    SIT: {
      JY: `https://yy.hmvesttrade.com`,
      HZ: `${protocol}//hz-uat.finsmart.sg`,
      BUCKET: `web-${BROKER_NAME}-uat-1319870113.cos.accelerate.myqcloud.com`,
      BUCKET_PRIVATE: `web-static-${BROKER_NAME}-uat-1319870113.cos.accelerate.myqcloud.com`,
      M: `${protocol}//${BROKER_NAME}-m-uat.feisima.com`,
      ADMIN: `${protocol}//${BROKER_NAME}-admin-uat.feisima.com`
    },
    UAT: {
      JY: `https://yy.hmvesttrade.com`,
      HZ: `${protocol}//hz-uat.finsmart.sg`,
      BUCKET: `web-mte-uat-1319870113.cos.accelerate.myqcloud.com`,
      BUCKET_PRIVATE: `web-static-mte-uat-1319870113.cos.accelerate.myqcloud.com`,
      M: `${protocol}//${BROKER_NAME}-m-uat.feisima.com`,
      ADMIN: `${protocol}//${BROKER_NAME}-admin-uat.feisima.com`
    },
    PRO: {
      JY: (() => {
        return `https://yy.hmvesttrade.com`;
      })(),
      HZ: `${protocol}//hz.feisima.com`,
      BUCKET: `web-${BROKER_NAME}-prd-1319870113.cos.accelerate.myqcloud.com`,
      BUCKET_PRIVATE: `web-static-${BROKER_NAME}-prd-1319870113.cos.accelerate.myqcloud.com`,
      M: (() => {
        return `${protocol}//${BROKER_NAME}-m.feisima.com`;
      })(),
      ADMIN: (() => {
        return `${protocol}//${BROKER_NAME}-admin.feisima.com`;
      })()
    }
  };
  return domains[environment];
};
const API_BASE_URL = getDomain(APP_NAME, ENV);
const DOMAIN = { ENV, isPro, API_BASE_URL };
export {
  API_BASE_URL,
  DOMAIN,
  ENV,
  isPro
};
