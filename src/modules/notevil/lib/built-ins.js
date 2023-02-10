import { playField } from "../../../common/game-state"; // TODO: Is there a better way to share this state?

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
const lerp = (a, b, t) => (b - a) * t + a;
const unlerp = (a, b, t) => (t - a) / (b - a);
const remap = (num, inMin, inMax, outMin, outMax) =>
  lerp(outMin, outMax, unlerp(inMin, inMax, num));

function look(vX, vY) {
  // WIP

  vX = clamp(Math.round(vX), -1, 1);
  vY = clamp(Math.round(vY), -1, 1);
}

export const builtIns = {
  // PI: Math.PI, not working for me for some reason
  sin: Math.sin,
  abs: Math.abs,
  acos: Math.acos,
  asin: Math.asin,
  atan: Math.atan,
  atan2: Math.atan2,
  cbrt: Math.cbrt,
  ceil: Math.ceil,
  cos: Math.cos,
  exp: Math.exp,
  floor: Math.floor,
  max: Math.max,
  min: Math.min,
  pow: Math.pow,
  random: Math.random,
  sign: Math.sign,
  sqrt: Math.sqrt,
  tan: Math.tan,
  trunc: Math.trunc,
  round: Math.round,
  clamp,
  lerp,
  unlerp,
  remap,
  // look
};
