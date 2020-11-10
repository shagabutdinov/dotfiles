"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addJestRenderImport = void 0;
const utils = __importStar(require("./lib/utils"));
function addJestRenderImport(document, cursor, importing) {
    const range = utils.getRange(document, /const\s+\{.*?\}\s+=\s+render/g, {
        before: cursor.start,
        index: "last",
    });
    if (!range) {
        return;
    }
    if (utils.contains(document, importing, { range })) {
        return;
    }
    // throw new Error(
    //   JSON.stringify({
    //     r: range,
    //     t: document.getText(range),
    //     c: utils.replace(document, /(?=\s*\}\s+=\s+render)/, ", " + importing, {
    //       range,
    //     }),
    //   })
    // );
    return utils.replace(document, /(?=\s*\}\s+=\s+render)/, ", " + importing, {
        range,
    });
}
exports.addJestRenderImport = addJestRenderImport;
//# sourceMappingURL=jest.js.map