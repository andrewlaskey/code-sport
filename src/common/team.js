import safeEval from '../modules/notevil'

export const createMoveFunction = (fnString) => {
  return safeEval.Function('t', 'i', 'x', 'y', 'vx', 'vy', `return ${fnString}`)
}

export const createPlaceFunction = (fnString) => {
  return safeEval.Function('i', `return ${fnString}`)
}

export const updateTeam = (players, fnX, fnY, time) => {
  return players.map((player, index) => {
    const { x, y, vx, vy } = player
    const moveX = fnX(
      time,
      index,
      x,
      y,
      vx,
      vy
    )
    const moveY = fnY(
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

export const placeTeam = (playerNum, fnX, fnY) => {
  const newTeam = []

  for (let index = 0; index < playerNum; index++) {
    const placeX = fnX(index)
    const placeY = fnY(index)

    newTeam.push({
      x: placeX,
      y: placeY,
      vx: 0,
      vy: 0,
    })
  }

  return newTeam
}

export const encodeTeam = (teamFuncs) => {
  return Window.btoa(JSON.stringify(teamFuncs).toString('base64'))
}

export const decodeTeam = (code) => {
  try {
    return code ? JSON.parse(Window.atob(code)) : {}
  } catch {
    return {}
  }
}