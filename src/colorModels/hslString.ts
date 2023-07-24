import { RgbaColor } from "../types";
import { clampHsla, rgbaToHsla, hslaToRgba, roundHsla } from "./hsl";

// Functional syntax
// hsl( <hue>, <percentage>, <percentage>, <alpha-value>? )
const commaHslaMatcher = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i;

// Whitespace syntax
// hsl( <hue> <percentage> <percentage> [ / <alpha-value> ]? )
const spaceHslaMatcher = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i;

/**
 * Parses a valid HSL[A] CSS color function/string
 * https://www.w3.org/TR/css-color-4/#the-hsl-notation
 */
export const parseHslaString = (input: string): RgbaColor | null => {
  const match = commaHslaMatcher.exec(input) || spaceHslaMatcher.exec(input);

  if (!match) return null;

  const hsla = clampHsla({
    h: Number(match[1]),
    s: Number(match[3]),
    l: Number(match[4]),
    a: match[5] === undefined ? 1 : Number(match[5]) / (match[6] ? 100 : 1),
  });

  return hslaToRgba(hsla);
};

export const rgbaToHslaString = (rgba: RgbaColor): string => {
  const { h, s, l, a } = roundHsla(rgbaToHsla(rgba));
  return a < 1 ? `hsla(${h}, ${s}%, ${l}%, ${a})` : `hsl(${h}, ${s}%, ${l}%)`;
};
