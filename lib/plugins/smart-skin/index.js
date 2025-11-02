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
  BROKER_THEME_TYPE_LIST_MAP: () => BROKER_THEME_TYPE_LIST_MAP,
  SmartSkin: () => SmartSkin,
  loadStylesheet: () => loadStylesheet
});
module.exports = __toCommonJS(stdin_exports);
class SmartSkin {
  constructor(options) {
    this.setupDarkModeDebugger = () => {
      const isExistButton = document.querySelector(".darkmode-toggle");
      if (isExistButton)
        return;
      const addStyle = (css2) => {
        const linkElement = document.createElement("link");
        linkElement.setAttribute("rel", "stylesheet");
        linkElement.setAttribute("type", "text/css");
        linkElement.setAttribute(
          "href",
          "data:text/css;charset=UTF-8," + encodeURIComponent(css2)
        );
        document.head.appendChild(linkElement);
      };
      const css = `
            .darkmode-toggle {
                background: #100f2c;
                width: 40px;
                height: 40px;
                position: fixed;
                border-radius: 50%;
                border:none;
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                z-index:9999;
              }
        `;
      const button = document.createElement("button");
      button.innerHTML = "\u{1F313}";
      button.classList.add("darkmode-toggle");
      button.style.left = document.documentElement.clientWidth - 80 + "px";
      button.style.top = document.documentElement.clientHeight - 80 + "px";
      button.addEventListener("click", () => {
        let index = this.options.skinTypeList.findIndex(
          (item) => item === this.options.currentSkin
        );
        index = (index + 1) % this.options.skinTypeList.length;
        this.changeSkinType(this.options.skinTypeList[index]);
      });
      document.body.appendChild(button);
      let moveFlag = false;
      button.addEventListener("mousedown", () => {
        moveFlag = true;
      });
      document.documentElement.addEventListener("mousemove", (ev) => {
        if (moveFlag) {
          window.requestAnimationFrame(() => {
            button.style.left = ev.x - 15 + "px";
            button.style.top = ev.y - 15 + "px";
          });
        }
      });
      document.documentElement.addEventListener("mouseup", (ev) => {
        moveFlag = false;
      });
      button.addEventListener("touchstart", () => {
        moveFlag = true;
      });
      document.documentElement.addEventListener("touchmove", (ev) => {
        if (moveFlag) {
          window.requestAnimationFrame(() => {
            button.style.left = ev.changedTouches[0].pageX - 15 + "px";
            button.style.top = ev.changedTouches[0].pageY - 15 + "px";
          });
        }
      });
      document.documentElement.addEventListener("touchend", (ev) => {
        moveFlag = false;
      });
      addStyle(css);
    };
    this.options = options;
    this.options.currentSkin = this.options.currentSkin || this.options.skinTypeList[0];
  }
  init() {
    if (this.options.skinTypeList.length === 0) {
      console.error(`skinTypeList cannot be empty`);
      return;
    }
    if (this.options.currentSkin) {
      this.changeSkinType(this.options.currentSkin);
    }
    if (this.options.followUpSystem) {
      const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
      this._followUpSystem(matchMedia);
      if (matchMedia && matchMedia.addEventListener) {
        matchMedia.addEventListener("change", (ev) => {
          this._followUpSystem(ev);
        });
      } else {
        matchMedia.addListener((ev) => {
          this._followUpSystem(ev);
        });
      }
    }
    this.options.debugger && this.setupDarkModeDebugger();
  }
  removeAllSkinType() {
    document.body.classList.remove(...this.options.skinTypeList);
  }
  changeSkinType(skinType) {
    if (skinType) {
      this.options.currentSkin = skinType;
      this.removeAllSkinType();
      document.body.classList.add(skinType);
    }
  }
  _followUpSystem(ev) {
    this.changeSkinType(
      ev.matches ? this.options.darkSkinType : this.options.lightSkinStype
    );
  }
}
const loadStylesheet = (theme = "mte") => __async(void 0, null, function* () {
  try {
    import(`broker-h5/es/plugins/smart-skin/theme/${theme}/styles/index.css`);
    console.log(`Stylesheet for ${theme} loaded successfully.`);
  } catch (error) {
    console.error(`Error loading stylesheet for ${theme}:`, error);
    const baseTheme = "mte";
    import(`broker-h5/es/plugins/smart-skin/theme/${baseTheme}/styles/index.css`);
  }
});
const BROKER_THEME_TYPE_LIST_MAP = {
  fins: ["app__white_theme", "app__black_theme", "app__blue_theme"],
  mte: ["app__white_theme", "app__black_theme"],
  mercury: ["app__white_theme", "app__black_theme", "app__blue_theme"],
  ta: ["app__white_theme", "app__black_theme", "app__blue_theme"],
  aei: ["app__white_theme", "app__black_theme", "app__blue_theme"],
  dcmsg: ["app__white_theme", "app__black_theme", "app__blue_theme"]
};
