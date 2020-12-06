import { Input, AnyColor, RgbaColor, HslaColor, HsvaColor } from "./types";
import { parse } from "./parse";
import { rgbaToHex } from "./convert/hex";
import { roundRgba } from "./convert/rgba";
import { rgbaToRgbaString } from "./convert/rgbaString";
import { rgbaToHsla } from "./convert/hsla";
import { rgbaToHslaString } from "./convert/hslaString";
import { rgbaToHsva } from "./convert/hsva";
import { rgbaToHsvaString } from "./convert/hsvaString";
import { saturate } from "./manipulate/saturate";

export class Colord {
  rgba: RgbaColor;

  constructor(input: AnyColor) {
    // Internal color format is RGBA object.
    // We do not round interval RGBA value for better conversion accuracy
    this.rgba = parse(input as Input) || { r: 0, g: 0, b: 0, a: 1 };
  }

  // Convert
  public toHex = (): string => rgbaToHex(this.rgba);
  public toRgba = (): RgbaColor => roundRgba(this.rgba);
  public toRgbaString = (): string => rgbaToRgbaString(this.rgba);
  public toHsla = (): HslaColor => rgbaToHsla(this.rgba);
  public toHslaString = (): string => rgbaToHslaString(this.rgba);
  public toHsva = (): HsvaColor => rgbaToHsva(this.rgba);
  public toHsvaString = (): string => rgbaToHsvaString(this.rgba);

  // Manipulate
  public saturate = (amount: number): Colord => saturate(this.rgba, amount);
  public desaturate = (amount: number): Colord => saturate(this.rgba, -amount);
  public grayscale = (): Colord => saturate(this.rgba, -100);
}

export const colord = (input: AnyColor | Colord): Colord => {
  if (input instanceof Colord) return input;
  return new Colord(input);
};
