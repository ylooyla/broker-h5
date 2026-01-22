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
      SW_JY: ORIGIN + "/proxy-sw-jy-host",
      ND_JY: ORIGIN + "/proxy-nd-jy-host",
      BUCKET: `web-static-mte-uat-1319870113.cos.accelerate.myqcloud.com`,
      BUCKET_PRIVATE: `web-mte-uat-1319870113.cos.accelerate.myqcloud.com`,
      M: `http://${BROKER_NAME}-m-uat.feisima.com`,
      ADMIN: `http://${BROKER_NAME}-admin-uat.feisima.com`
    },
    DEV: {
      JY: `${protocol}//${BROKER_NAME}-jy-uat.feisima.com`,
      HZ: `${protocol}//hz-uat.finsmart.sg`,
      SW_JY: `${protocol}//sw-jy-sit.usmartsg.com`,
      ND_JY: `${protocol}//nd-jy-sit.usmartsg.com`,
      BUCKET: `web-static-mte-uat-1319870113.cos.accelerate.myqcloud.com`,
      BUCKET_PRIVATE: `web-mte-uat-1319870113.cos.accelerate.myqcloud.com`,
      M: `${protocol}//${BROKER_NAME}-m-uat.feisima.com`,
      ADMIN: `${protocol}//${BROKER_NAME}-admin-uat.feisima.com`
    },
    SIT: {
      JY: `${protocol}//${BROKER_NAME}-jy-uat.feisima.com`,
      HZ: `${protocol}//hz-uat.finsmart.sg`,
      SW_JY: `${protocol}//sw-jy-sit.usmartsg.com`,
      ND_JY: `${protocol}//nd-jy-sit.usmartsg.com`,
      BUCKET: `web-static-mte-uat-1319870113.cos.accelerate.myqcloud.com`,
      BUCKET_PRIVATE: `web-mte-uat-1319870113.cos.accelerate.myqcloud.com`,
      M: `${protocol}//${BROKER_NAME}-m-uat.feisima.com`,
      ADMIN: `${protocol}//${BROKER_NAME}-admin-uat.feisima.com`
    },
    UAT: {
      JY: `${protocol}//${BROKER_NAME}-jy-uat.feisima.com`,
      HZ: `${protocol}//hz-uat.finsmart.sg`,
      SW_JY: `${protocol}//sw-jy-uat.usmartsg.com`,
      ND_JY: `${protocol}//nd-jy-uat.usmartsg.com`,
      BUCKET: `web-static-mte-uat-1319870113.cos.accelerate.myqcloud.com`,
      BUCKET_PRIVATE: `web-mte-uat-1319870113.cos.accelerate.myqcloud.com`,
      M: `${protocol}//${BROKER_NAME}-m-uat.feisima.com`,
      ADMIN: `${protocol}//${BROKER_NAME}-admin-uat.feisima.com`
    },
    PRO: {
      JY: (() => {
        return `${protocol}//${BROKER_NAME}-jy.feisima.com`;
      })(),
      HZ: `${protocol}//hz.feisima.com`,
      SW_JY: `${protocol}//sw-broker.feisima.com`,
      ND_JY: `${protocol}//nd-jy.usmartsg.com`,
      BUCKET: `web-static-${BROKER_NAME}-prd-1319870113.cos.accelerate.myqcloud.com`,
      BUCKET_PRIVATE: `web-${BROKER_NAME}-prd-1319870113.cos.accelerate.myqcloud.com`,
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
