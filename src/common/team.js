export const updateTeam = (players, xMoveFn, yMoveFn, time) => {
  return players.map((player, index) => {
    const { x, y, vx, vy } = player
    const moveX = xMoveFn(
      time,
      index,
      x,
      y,
      vx,
      vy
    )
    const moveY = yMoveFn(
      time,
      index,
      x,
      y,
      vx,
      vy
    )

    return {
      x: x + moveX,
      y: y + moveY,
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