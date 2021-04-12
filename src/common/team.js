export const updateTeam = (players, xMoveFn, yMoveFn) => {
  return players.map((player, index) => {
    const moveX = xMoveFn(
      index,
      player.x,
      player.y,
      player.vx,
      player.vy
    )
    const moveY = yMoveFn(
      index,
      player.x,
      player.y,
      player.vx,
      player.vy
    )

    return {
      x: player.x + moveX,
      y: player.y + moveY,
      vx: moveX,
      vy: moveY,
    }
  })
}

export const encodeTeam = (teamFuncs) => {
  return btoa(JSON.stringify(teamFuncs))
}

export const decodeTeam = (code) => {
  try {
    return code ? JSON.parse(atob(code)) : {}
  } catch {
    return {}
  }
}