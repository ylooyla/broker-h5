var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
var stdin_exports = {};
__export(stdin_exports, {
  default: () => Layout
});
module.exports = __toCommonJS(stdin_exports);
var import_react = require("react");
var import_html_utils = require("../../utils/html-utils");
var import_jsx_runtime = require("react/jsx-runtime");
var import_jsx_runtime2 = require("react/jsx-runtime");
function Layout(props) {
  (0, import_react.useEffect)(() => {
    const clear = () => __async(this, null, function* () {
      if (import_html_utils.isIOS) {
        const elWrapper = document.querySelector(".main-wrapper");
        const BScroll = yield import("better-scroll");
        if (elWrapper !== null) {
          new BScroll.default(elWrapper, {
            scrollY: true,
            bounce: false,
            click: true,
            autoBlur: props.autoBlurFlag
          });
        }
      }
    });
    clear();
  });
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", {
    className: "smart-layout",
    children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
      children: props.header
    }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
      className: "main-wrapper",
      children: props.main
    }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
      className: "layout-footer",
      children: props.footer
    })]
  });
}
