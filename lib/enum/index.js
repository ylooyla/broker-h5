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
  LanguageTypeEnum: () => LanguageTypeEnum
});
module.exports = __toCommonJS(stdin_exports);
var LanguageTypeEnum = /* @__PURE__ */ ((LanguageTypeEnum2) => {
  LanguageTypeEnum2[LanguageTypeEnum2["zhCHS"] = 1] = "zhCHS";
  LanguageTypeEnum2[LanguageTypeEnum2["zhCHT"] = 2] = "zhCHT";
  LanguageTypeEnum2[LanguageTypeEnum2["en"] = 3] = "en";
  LanguageTypeEnum2[LanguageTypeEnum2["ms"] = 4] = "ms";
  LanguageTypeEnum2[LanguageTypeEnum2["th"] = 5] = "th";
  LanguageTypeEnum2[LanguageTypeEnum2["ja"] = 6] = "ja";
  return LanguageTypeEnum2;
})(LanguageTypeEnum || {});
