import { isIOS, isAndroid, isYouxinApp } from "../../utils/html-utils";
const jsBridge = {
  isYouxinApp,
  isOfflineYouxinApp: isYouxinApp && location.protocol === "file:",
  hasBridge: isYouxinApp,
  callAppNoPromise(event, data = {}, successCallBackName, failCallBackName) {
    if (!this.isYouxinApp) {
      return;
    }
    if (isAndroid) {
      data = JSON.stringify(data);
      window.JSActionBridge.handlerAction(
        event,
        data,
        successCallBackName,
        failCallBackName
      );
    }
    if (isIOS) {
      window.webkit.messageHandlers.JSActionBridge.postMessage({
        method: "handlerAction",
        data: {
          actionEvent: event,
          paramsJsonValue: data,
          successCallback: successCallBackName,
          errorCallback: failCallBackName
        }
      });
    }
  },
  callApp(event, data = {}) {
    return new Promise((resolve, reject) => {
      if (!this.hasBridge) {
        resolve("not in youxin app");
        return;
      }
      const callbackKey = Date.now() + "" + Math.floor(Math.random() * 1e5);
      window.callBackList = window.callBackList || [];
      window.callBackList.push(callbackKey);
      const successName = `s${callbackKey}`;
      const failName = `f${callbackKey}`;
      window[successName] = function(data2) {
        isAndroid && (data2 = JSON.parse(data2));
        if (data2.code === -1) {
          reject(data2);
        } else {
          resolve(data2.data);
        }
      };
      window[failName] = function(err) {
        isAndroid && (err = JSON.parse(err));
        reject(err);
      };
      if (isAndroid) {
        data = JSON.stringify(data);
        window.JSActionBridge.handlerAction(event, data, successName, failName);
      }
      if (isIOS) {
        window.webkit.messageHandlers.JSActionBridge.postMessage({
          method: "handlerAction",
          data: {
            actionEvent: event,
            paramsJsonValue: data,
            successCallback: successName,
            errorCallback: failName
          }
        });
      }
    });
  },
  registerFn(fnName, fn) {
    if (typeof fnName !== "string") {
      throw TypeError("Illegal fnName: Not an string");
    }
    if (typeof fn !== "function") {
      throw TypeError("Illegal fn: Not an function");
    }
    window[fnName] = function(data) {
      if (isIOS) {
        fn(data);
      }
      if (isAndroid) {
        data = data || "{}";
        fn(JSON.parse(data));
      }
    };
  },
  unregisterFn(fnName) {
    if (typeof fnName !== "string") {
      throw TypeError("Illegal fnName: Not an string");
    }
    delete window[fnName];
  },
  gotoNativeModule(url, isWaitingResult = false) {
    if (this.isYouxinApp) {
      this.callApp("goto_native_module", {
        url,
        isWaitingResult
      });
    }
  },
  gotoNewWebview(url, titleBarVisible = true, title = "") {
    if (this.isYouxinApp) {
      this.gotoNativeModule(
        `usmart-goto://webview?url=${encodeURIComponent(
          url
        )}&titleBarVisible=${titleBarVisible}&title=${title}`
      );
    } else {
      window.location.href = url;
    }
  },
  gotoCustomerService() {
    this.callApp("command_contact_service");
  },
  watchPageActivity(activated, deactivated) {
    const successCallBackName = "command_watch_activity_status_success_callback";
    const failCallBackName = "command_watch_activity_status_fail_callback";
    const successCallBack = window[successCallBackName];
    const failCallBack = window[successCallBackName];
    this.registerFn(successCallBackName, function(data) {
      if (Object.prototype.toString.apply(successCallBack) === "[object Function]") {
        successCallBack(data);
      }
      try {
        console.log(data, "visible");
        if (typeof data === "string") {
          data = JSON.parse(data);
        }
        if (data.data.status === "visible") {
          activated(data);
        } else {
          deactivated(data);
        }
      } catch (e) {
        console.log(successCallBackName, e);
      }
    });
    this.registerFn(failCallBackName, function(data) {
      if (Object.prototype.toString.apply(failCallBack) === "[object Function]") {
        failCallBack(data);
      }
      console.log(failCallBackName, data);
    });
    this.callAppNoPromise(
      "command_watch_activity_status",
      {},
      successCallBackName,
      failCallBackName
    );
  },
  _appUser: {
    _loaded: false,
    userName: "",
    phoneNum: "",
    trade_token: "",
    userId: "",
    userToken: "",
    openedAccount: false,
    tradePassword: false,
    invitationCode: "",
    hkQuoteLevel: 0,
    usQuoteLevel: 0
  },
  getAppUser(needRenew) {
    return new Promise((resolve) => {
      if (!this.isYouxinApp) {
        resolve(this._appUser);
      }
      if (needRenew || !this._appUser._loaded) {
        this.callApp("get_user_info").then((res) => {
          this._appUser = res;
          this._appUser._loaded = true;
        });
      }
      resolve(this._appUser);
    });
  },
  _originUrl: "",
  _shortUrl: "",
  share() {
    return new Promise((resolve) => {
      resolve();
    });
  }
};
export {
  jsBridge
};
