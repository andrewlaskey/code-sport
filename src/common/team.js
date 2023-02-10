import safeEval from "../modules/notevil";
import { GAME_SIZE } from "./constants";
import { wrapInGrid } from "./math";

export const createMoveFunction = (fnString) => {
  return safeEval.Function(
    "t",
    "i",
    "x",
    "y",
    "vx",
    "vy",
    // "Hidden" args
    "teamSize",
    "teamPoints",
    `const GAME_SIZE = ${GAME_SIZE}; ${fnString}`
  );
};

export const createPlaceFunction = (fnString) => {
  return safeEval.Function(
    "i",
    // "Hidden" args
    "teamSize",
    `const GAME_SIZE = ${GAME_SIZE}; ${fnString}`
  );
};

export const updateTeam = (players, fnX, fnY, time, score = 0) => {
  return players.map((player, index) => {
    const { x, y, vx, vy } = player;

    const outputX = fnX(time, index, x, y, vx, vy, players.length, score);
    const outputY = fnY(time, index, x, y, vx, vy, players.length, score);
    const moveX = outputX > 0 ? 1 : outputX < 0 ? -1 : 0;
    const moveY = outputY > 0 ? 1 : outputY < 0 ? -1 : 0;

    return {
      x: wrapInGrid(x + moveX),
      y: wrapInGrid(y + moveY),
      vx: moveX,
      vy: moveY,
    };
  });
};

export const placeTeam = (teamSize, fnX, fnY) => {
  const newTeam = [];

  for (let index = 0; index < teamSize; index++) {
    const placeX = fnX(index, teamSize);
    const placeY = fnY(index, teamSize);

    newTeam.push({
      x: wrapInGrid(placeX),
      y: wrapInGrid(placeY),
      vx: 0,
      vy: 0,
    });
  }

  return newTeam;
};

export const encodeTeam = (teamFuncs) => {
  return window.btoa(JSON.stringify(teamFuncs));
};

export const decodeTeam = (code) => {
  try {
    return code ? JSON.parse(window.atob(code)) : {};
  } catch {
    return {};
  }
};
