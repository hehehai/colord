import { RgbaColor } from "../types";
import { clampLcha, rgbaToLcha, lchaToRgba, roundLcha } from "./lch";

// The only valid LCH syntax
// lch() = lch( <percentage> <number> <hue> [ / <alpha-value> ]? )
const lchaMatcher = /^lch\(\s*(-?\d+\.?\d*)%\s+(-?\d+\.?\d*)\s+(-?\d+\.?\d*)(deg)?\s*(?:\/\s*(-?\d*\.?\d+)(%)?\s*)?\)$/i;

/**
 * Parses a valid LCH CSS color function/string
 * https://www.w3.org/TR/css-color-4/#specifying-lab-lch
 */
export const parseLchaString = (input: string): RgbaColor | null => {
  const match = lchaMatcher.exec(input);

  if (!match) return null;

  const lcha = clampLcha({
    l: Number(match[1]),
    c: Number(match[2]),
    h: Number(match[3]),
    a: match[4] === undefined ? 1 : Number(match[4]) / (match[5] ? 100 : 1),
  });

  return lchaToRgba(lcha);
};

export const rgbaToLchaString = (rgba: RgbaColor): string => {
  const { l, c, h, a } = roundLcha(rgbaToLcha(rgba));
  return a < 1 ? `lch(${l}% ${c} ${h} / ${a})` : `lch(${l}% ${c} ${h})`;
};
