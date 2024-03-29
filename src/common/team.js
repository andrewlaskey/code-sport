import safeEval from "../modules/notevil";
import { GAME_SIZE, PLAYER_VISION } from "./constants";
import { wrapInGrid } from "./math";
import { playField, neighborType } from "./game-state"; // TODO: Is there a better way to share this state?

export const createMoveFunction = (fnString) => {
  return safeEval.Function(
    "t",
    "i",
    "x",
    "y",
    "vx",
    "vy",
    "neighbors",
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

    const teamOneType = JSON.stringify(playField.teamOnePlayers) == JSON.stringify(players) 
      ? neighborType.TEAM 
      : neighborType.ENEMY;
    const teamTwoType = teamOneType == neighborType.TEAM 
      ? neighborType.ENEMY 
      : neighborType.TEAM;

    const neighbors =
      playField.flags.map(f => ({ x: f.x, y: f.y, type: neighborType.FLAG }))
      // TODO: map, filter, find, etc. not working so can't loop to check neighbor type
      // .concat(playField.teamOnePlayers.map(p => ({ x: p.x, y: p.y, type: teamOneType })))
      // .concat(playField.teamTwoPlayers.map(p => ({ x: p.x, y: p.y, type: teamTwoType })))
      .map(n => ({...n, ...neighborData(x, y, n.x, n.y)}))
      .filter(r => r.inVision)
      .map(r => ({ x: r.x, y: r.y, type: r.type }))

    const outputX = fnX(time, index, x, y, vx, vy, neighbors, players.length, score);
    const outputY = fnY(time, index, x, y, vx, vy, neighbors, players.length, score);
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

const neighborData = (playerX, playerY, otherX, otherY) => {
  const xRel = Math.round(otherX - playerX);
  const yRel = Math.round(otherY - playerY);
  const xDiff = Math.abs(xRel);
  const yDiff = Math.abs(yRel);
  const inVision = xDiff + yDiff > 0 && xDiff <= PLAYER_VISION && yDiff <= PLAYER_VISION;
    
  return {
    inVision,
    x: xRel,
    y: yRel,
  }
}

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
