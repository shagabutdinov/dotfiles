import { addJestRenderImport } from "./jest";
import * as lst from "vscode-languageserver-types";

describe(addJestRenderImport, () => {
  it("returns changes", () => {
    expect(
      addJestRenderImport(
        {
          getText: () => "const { value } = render(<Component />)\n\n",
        } as lst.TextDocument,
        { start: { line: 2, character: 0 }, end: { line: 2, character: 0 } },
        "IMPORTING"
      )
    ).toEqual([
      {
        newText: ", IMPORTING",
        range: {
          start: { line: 0, character: 13 },
          end: { line: 0, character: 13 },
        },
      },
    ]);
  });

  it("returns changes for the latest render", () => {
    expect(
      addJestRenderImport(
        {
          getText: () =>
            [
              "const { value1 } = render(<Component />)\n\n",
              "const { value2 } = render(<Component />)\n\n",
            ].join("\n"),
        } as lst.TextDocument,
        { start: { line: 4, character: 0 }, end: { line: 4, character: 0 } },
        "IMPORTING"
      )
    ).toEqual([
      {
        newText: ", IMPORTING",
        range: {
          start: { line: 3, character: 14 },
          end: { line: 3, character: 14 },
        },
      },
    ]);
  });

  it("does not add importing if it exists", () => {
    expect(
      addJestRenderImport(
        {
          getText: () =>
            "const { value, IMPORTING } = render(<Component />)\n\n",
        } as lst.TextDocument,
        { start: { line: 2, character: 0 }, end: { line: 2, character: 0 } },
        "IMPORTING"
      )
    ).toEqual(undefined);
  });
});
