// TODO: Is there a better way to share this state?
// This object should be considered read-only outside of a Vue file.
export const playField = {
  teamOnePlayers: [],
  teamTwoPlayers: [],
  flags: [],
};

export const neighborType = {
  TEAM: 1,
  ENEMY: -1,
  FLAG: 0,
}