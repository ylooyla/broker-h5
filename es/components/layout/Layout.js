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
import { useEffect } from "react";
import { isIOS } from "../../utils/html-utils";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function Layout(props) {
  useEffect(() => {
    const clear = () => __async(this, null, function* () {
      if (isIOS) {
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
  return /* @__PURE__ */ _jsxs("div", {
    className: "smart-layout",
    children: [/* @__PURE__ */ _jsx("header", {
      children: props.header
    }), /* @__PURE__ */ _jsx("main", {
      className: "main-wrapper",
      children: props.main
    }), /* @__PURE__ */ _jsx("footer", {
      className: "layout-footer",
      children: props.footer
    })]
  });
}
export {
  Layout as default
};
