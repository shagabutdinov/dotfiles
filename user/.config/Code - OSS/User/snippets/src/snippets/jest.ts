import * as lst from "vscode-languageserver-types";
import * as utils from "./lib/utils";

export function addJestRenderImport(
  document: lst.TextDocument,
  cursor: lst.Range,
  importing: string
): lst.TextEdit[] | undefined {
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
