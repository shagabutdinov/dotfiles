"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils = __importStar(require("./lib/utils"));
function addJestRenderImport(document, cursor, importing) {
    const range = utils.getRange(document, /const\s+\{.*?\}\s+=\s+render/g, {
        to: cursor.start,
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