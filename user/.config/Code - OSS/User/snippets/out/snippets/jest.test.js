"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jest_1 = require("./jest");
describe(jest_1.addJestRenderImport, () => {
    it("returns changes", () => {
        expect(jest_1.addJestRenderImport({
            getText: () => "const { value } = render(<Component />)\n\n",
        }, { start: { line: 2, character: 0 }, end: { line: 2, character: 0 } }, "IMPORTING")).toEqual([
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
        expect(jest_1.addJestRenderImport({
            getText: () => [
                "const { value1 } = render(<Component />)\n\n",
                "const { value2 } = render(<Component />)\n\n",
            ].join("\n"),
        }, { start: { line: 4, character: 0 }, end: { line: 4, character: 0 } }, "IMPORTING")).toEqual([
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
        expect(jest_1.addJestRenderImport({
            getText: () => "const { value, IMPORTING } = render(<Component />)\n\n",
        }, { start: { line: 2, character: 0 }, end: { line: 2, character: 0 } }, "IMPORTING")).toEqual(undefined);
    });
});
//# sourceMappingURL=jest.test.js.map