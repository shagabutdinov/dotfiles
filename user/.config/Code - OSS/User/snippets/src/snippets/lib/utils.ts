import * as lst from "vscode-languageserver-types";

export function getText(
  document: lst.TextDocument,
  match: Match | null,
  options: Span & Index = {}
): string | null {
  const range = getRange(document, match, options);
  if (!range) {
    return null;
  }

  return document.getText(range);
}

export function getRange(
  document: lst.TextDocument,
  match: Match | null,
  options: Span & Index = {}
): lst.Range | null {
  const result = getRanges(document, match, options);
  if (!result) {
    return null;
  }

  return getIndex(result, options);
}

export function getRanges(
  document: lst.TextDocument,
  match: Match | null,
  options: Span & Index = {}
): lst.Range[] | null {
  const { range, text, matches } = getMatches(document, match, options);
  if (!text || !range) {
    return null;
  }

  return matches.map((matching) => ({
    start: addPosition(
      range.start,
      textToPosition(text.substring(0, matching.index))
    ),
    end: addPosition(
      range.start,
      textToPosition(text.substring(0, matching.index) + matching.text)
    ),
  }));
}

export function getPosition(
  document: lst.TextDocument,
  match: Match | null,
  options: Span & Index = {}
): lst.Position | null {
  const result = getPositions(document, match, options);
  if (!result) {
    return null;
  }

  return getIndex(result, options);
}

export function getPositions(
  document: lst.TextDocument,
  match: Match | null,
  options: Span & Index = {}
): lst.Position[] | null {
  const { range, text, matches } = getMatches(document, match, options);
  if (!text || !range) {
    return null;
  }

  return matches.map((matching) =>
    addPosition(range.start, textToPosition(text.substring(0, matching.index)))
  );
}

export function contains(
  document: lst.TextDocument,
  match: Match,
  options: Span & Index = {}
): boolean {
  const { matches } = getMatches(document, match, options);
  return matches.length !== 0;
}

export function replace(
  document: lst.TextDocument,
  subject: Match,
  value: string,
  span: Span = {}
): lst.TextEdit[] {
  return (getRanges(document, subject, span) || []).map((range) => ({
    range,
    newText: value,
  }));
}

function getMatches(
  document: lst.TextDocument,
  match: Match | null,
  options: Span & Index = {}
): {
  range: lst.Range | null;
  text: string | null;
  matches: Matching[];
  matching: Matching | null;
} {
  const range = findRange(document, options);
  if (!range) {
    return { range: null, text: null, matching: null, matches: [] };
  }

  const text = document.getText(range);

  if (match === null) {
    const matching = { index: 0, text: "" };
    return { range, text, matching, matches: [matching] };
  }

  const regExp =
    match instanceof RegExp ? match : new RegExp(escapeRegExp(match), "g");

  const matches = (regExp.global
    ? [
        ...text.matchAll(
          match instanceof RegExp ? match : new RegExp(escapeRegExp(match), "g")
        ),
      ]
    : (() => {
        const match = text.match(regExp);
        if (!match) {
          return [];
        }

        return [match];
      })()
  ).map((value) => ({
    index: value.index!,
    text: value[0],
  }));

  return {
    range,
    text,
    matches,
    matching: getIndex(matches, options),
  };
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

function addPosition(
  position: lst.Position,
  value: lst.Position
): lst.Position {
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

function textToPosition(text: string): lst.Position {
  const lines = text.split("\n");
  return { line: lines.length - 1, character: lines[lines.length - 1].length };
}

export function findRange(
  document: lst.TextDocument,
  { after, before, range }: Span
): lst.Range | null {
  if ((after || before) && range) {
    throw new Error("from or to, and range can not be specified ");
  }

  if (range) {
    if (lst.Range.is(range)) {
      return range;
    }

    return getRange(document, range);
  }

  const start = after
    ? lst.Position.is(after)
      ? after
      : getPosition(document, after)
    : { line: 0, character: 0 };

  const end = before
    ? lst.Position.is(before)
      ? before
      : getPosition(document, before)
    : textToPosition(document.getText());

  if (!start || !end) {
    return null;
  }

  return { start, end };
}

function getIndex<Type>(array: Type[], { index }: Index): Type | null {
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

type Match = RegExp | string;
type Matching = { index: number; text: string };

type Span = {
  after?: Match | lst.Position | null;
  before?: Match | lst.Position | null;
  range?: Match | lst.Range | null;
};

type Index = {
  index?: number | "first" | "last" | null;
};

// type MatchIndex = {
//   matchIndex?: number | null;
// };
