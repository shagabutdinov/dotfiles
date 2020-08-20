"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const lst = __importStar(require("vscode-languageserver-types"));
function getRange(document, match, options = {}) {
    const result = getRanges(document, match, options);
    if (!result) {
        return null;
    }
    return getIndex(result, options);
}
exports.getRange = getRange;
function getRanges(document, match, options = {}) {
    const { range, text, matches } = getMatches(document, match, options);
    if (!text || !range) {
        return null;
    }
    return matches.map((matching) => ({
        start: addPosition(range.start, textToPosition(text.substring(0, matching.index))),
        end: addPosition(range.start, textToPosition(text.substring(0, matching.index) + matching.text)),
    }));
}
exports.getRanges = getRanges;
function getPosition(document, match, options = {}) {
    const result = getPositions(document, match, options);
    if (!result) {
        return null;
    }
    return getIndex(result, options);
}
exports.getPosition = getPosition;
function getPositions(document, match, options = {}) {
    const { range, text, matches } = getMatches(document, match, options);
    if (!text || !range) {
        return null;
    }
    return matches.map((matching) => addPosition(range.start, textToPosition(text.substring(0, matching.index))));
}
exports.getPositions = getPositions;
function contains(document, match, options = {}) {
    const { matches } = getMatches(document, match, options);
    return matches.length !== 0;
}
exports.contains = contains;
function replace(document, subject, value, span = {}) {
    return (getRanges(document, subject, span) || []).map((range) => ({
        range,
        newText: value,
    }));
}
exports.replace = replace;
function getMatches(document, match, options = {}) {
    const range = findRange(document, options);
    if (!range) {
        return { range: null, text: null, matching: null, matches: [] };
    }
    const text = document.getText(range);
    if (match === null) {
        const matching = { index: 0, text: "" };
        return { range, text, matching, matches: [matching] };
    }
    const regExp = match instanceof RegExp ? match : new RegExp(escapeRegExp(match), "g");
    const matches = (regExp.global
        ? [
            ...text.matchAll(match instanceof RegExp ? match : new RegExp(escapeRegExp(match), "g")),
        ]
        : (() => {
            const match = text.match(regExp);
            if (!match) {
                return [];
            }
            return [match];
        })()).map((value) => ({
        index: value.index,
        text: value[0],
    }));
    return {
        range,
        text,
        matches,
        matching: getIndex(matches, options),
    };
}
function escapeRegExp(string) {
    return string.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}
function addPosition(position, value) {
    if (value.line === 0) {
        return {
            line: position.line,
            character: position.character + value.character,
        };
    }
    return {
        line: position.line + value.line,
        character: value.character,
    };
}
function textToPosition(text) {
    const lines = text.split("\n");
    return { line: lines.length - 1, character: lines[lines.length - 1].length };
}
function findRange(document, { from, to, range }) {
    if ((from || to) && range) {
        throw new Error("from or to, and range can not be specified ");
    }
    if (range) {
        if (lst.Range.is(range)) {
            return range;
        }
        return getRange(document, range);
    }
    const start = from
        ? lst.Position.is(from)
            ? from
            : getPosition(document, from)
        : { line: 0, character: 0 };
    const end = to
        ? lst.Position.is(to)
            ? to
            : getPosition(document, to)
        : textToPosition(document.getText());
    if (!start || !end) {
        return null;
    }
    return { start, end };
}
function getIndex(array, { index }) {
    if (array.length === 0) {
        return null;
    }
    if (!index || index === "first") {
        return array[0];
    }
    if (index === "last") {
        return array[array.length - 1];
    }
    return array[index];
}
//# sourceMappingURL=utils.js.map