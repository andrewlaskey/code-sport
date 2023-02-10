<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <h1 style="text-align: center">Capture the Flags</h1>
  <div class="flex-wrap">
    <div class="center-view">
      <div class="score-board">
        <h2>{{ teamOneScore }}</h2>
        <div class="game-actions">
          <button v-show="!isPlaying && !isPaused" @click="play" >Play</button>
          <button v-show="isPlaying" @click="reset">Reset</button>
          <button v-show="isPlaying && !isPaused" @click="pause">Pause</button>
          <button v-show="isPlaying && isPaused" @click="resume">Resume</button>
        </div>
        <h2>{{ teamTwoScore }}</h2>
      </div>
      <play-canvas
        :teamOne="field.teamOnePlayers"
        :teamTwo="field.teamTwoPlayers"
        :points="field.flags"
      />
    </div>
    <div class="team-view team-one">
      <h2 class="team-title" style="color: #d56871">
        Team Red ({{ field.teamOnePlayers.length }})
      </h2>
      <team-function-input
        team-number="one"
        :team="teamOne"
        :update-team="onInputTeamUpdate"
      />
      <team-code team-number="one" :team="teamOne" :load-team="loadTeam" />
    </div>
    <div class="team-view team-two">
      <h2 class="team-title" style="color: #62afee">
        Team Blue ({{ field.teamTwoPlayers.length }})
      </h2>
      <team-function-input
        team-number="two"
        :team="teamTwo"
        :update-team="onInputTeamUpdate"
      />
      <team-code team-number="two" :team="teamTwo" :load-team="loadTeam" />
    </div>
  </div>

  <info />
</template>

<script setup>
import { reactive, ref } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import PlayCanvas from './components/PlayCanvas.vue'
import TeamFunctionInput from './components/TeamFunctionInput.vue'
import TeamCode from './components/TeamCode.vue'
import Info from './components/Info.vue'
import { gridUnit } from './common/math'
import { playField } from './common/game-state'
import {
  createMoveFunction,
  createPlaceFunction,
  decodeTeam,
  encodeTeam,
  placeTeam,
  updateTeam,
} from './common/team'

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md

const defaultTeamOne = {
  moveX: 'return 1',
  moveY: 'return 1',
  placeX: 'return i * (GAME_SIZE / teamSize)',
  placeY: 'return 0',
};

const defaultTeamTwo = {
  moveX: 'return 1',
  moveY: 'return -1',
  placeX: 'return i * (GAME_SIZE / teamSize)',
  placeY: 'return GAME_SIZE',
};

const teamOne = reactive({
  moveX: defaultTeamOne.moveX,
  moveY: defaultTeamOne.moveY,
  placeX: defaultTeamOne.placeX,
  placeY: defaultTeamOne.placeY
});

const teamTwo = reactive({
  moveX: defaultTeamTwo.moveX,
  moveY: defaultTeamTwo.moveY,
  placeX: defaultTeamTwo.placeX,
  placeY: defaultTeamTwo.placeY
});

let isPaused = ref(false);
let isPlaying = ref(false);

let field = reactive(playField);
// let teamOnePlayers = ref([])
// let teamTwoPlayers = ref([])
// let points = ref([])
let teamOneScore = ref(0)
let teamTwoScore = ref(0)

let request
let startTime
let timer = ref(0)

const teamOneCode = computed(() => encodeTeam(teamOne))
const teamTwoCode = computed(() => encodeTeam(teamTwo))

const teamOneFns = {}
const teamTwoFns = {}

const runSim = () => {
  timer.value = (new Date() - startTime) / 1000
  field.teamOnePlayers = updateTeam(
    field.teamOnePlayers,
    teamOneFns.xMoveFn,
    teamOneFns.yMoveFn,
    timer.value,
    teamOneScore.value
  )
  field.teamTwoPlayers = updateTeam(
    field.teamTwoPlayers,
    teamTwoFns.xMoveFn,
    teamTwoFns.yMoveFn,
    timer.value,
    teamTwoScore.value
  )

  // Check collision
  const collisionIndexes = new Set()

  field.teamOnePlayers.forEach((player) => {
    field.flags.forEach((point, index) => {
      if (
        gridUnit(player.x) === gridUnit(point.x) &&
        gridUnit(player.y) === gridUnit(point.y)
      ) {
        teamOneScore.value++
        collisionIndexes.add(index)
      }
    })
  })

  field.teamTwoPlayers.forEach((player) => {
    field.flags.forEach((point, index) => {
      if (
        gridUnit(player.x) === gridUnit(point.x) &&
        gridUnit(player.y) === gridUnit(point.y)
      ) {
        teamTwoScore.value++
        collisionIndexes.add(index)
      }
    })
  })

  collisionIndexes.forEach((index) => {
    field.flags.splice(index, 1)
  })

  const playerCollisions = new Set()

  field.teamOnePlayers.forEach((playerOne, indexOne) => {
    field.teamTwoPlayers.forEach((playerTwo, indexTwo) => {
      if (
        gridUnit(playerOne.x) === gridUnit(playerTwo.x) &&
        gridUnit(playerOne.y) === gridUnit(playerTwo.y)
      ) {
        playerCollisions.add([indexOne, indexTwo])
      }
    })
  })

  playerCollisions.forEach(([indexOne, indexTwo]) => {
    const randTeam = Math.random() > 0.5 ? 1 : 0

    if (randTeam === 1) {
      field.teamOnePlayers.splice(indexOne, 1)
    }

    if (randTeam === 0) {
      field.teamTwoPlayers.splice(indexTwo, 1)
    }
  })

  request = window.requestAnimationFrame(runSim)

  if (field.flags.length <= 0) {
    window.cancelAnimationFrame(request)
  }
}

const play = () => {
    if (request) {
      window.cancelAnimationFrame(request)
    }

    isPlaying.value = true;
    isPaused.value = false;
    startTime = new Date()
    timer.value = 0
    teamOneScore.value = 0
    teamTwoScore.value = 0
    field.teamOnePlayers = []
    field.teamTwoPlayers = []
    field.flags = []

    teamOneFns.xMoveFn = createMoveFunction(teamOne.moveX)
    teamOneFns.yMoveFn = createMoveFunction(teamOne.moveY)
    teamOneFns.xPlaceFn = createPlaceFunction(teamOne.placeX)
    teamOneFns.yPlaceFn = createPlaceFunction(teamOne.placeY)

    teamTwoFns.xMoveFn = createMoveFunction(teamTwo.moveX)
    teamTwoFns.yMoveFn = createMoveFunction(teamTwo.moveY)
    teamTwoFns.xPlaceFn = createPlaceFunction(teamTwo.placeX)
    teamTwoFns.yPlaceFn = createPlaceFunction(teamTwo.placeY)

    field.teamOnePlayers = placeTeam(10, teamOneFns.xPlaceFn, teamOneFns.yPlaceFn)
    field.teamTwoPlayers = placeTeam(10, teamTwoFns.xPlaceFn, teamTwoFns.yPlaceFn)

    for (let index = 0; index < 10; index++) {
      field.flags.push({
        x: Math.random() * 59,
        y: Math.random() * 59,
      })
    }

  request = window.requestAnimationFrame(runSim)
}

const pause = () => {
  window.cancelAnimationFrame(request)
  isPaused.value = true;
}

const resume = () => {
  request = window.requestAnimationFrame(runSim)
  isPaused.value = false;
}

const reset = () => {
  if (request) {
    window.cancelAnimationFrame(request)
  }

  isPlaying.value = false;
  isPaused.value = false;

  teamOneScore.value = 0
  teamTwoScore.value = 0
  field.teamOnePlayers = []
  field.teamTwoPlayers = []
  field.flags = []
}

const loadTeam = (team, code) => {
  const obj = decodeTeam(code)

  if (team === 'one') {
    teamOne.moveX = obj.moveX || defaultTeamOne.moveX;
    teamOne.moveY = obj.moveY || defaultTeamTwo.moveY;
    teamOne.placeX = obj.placeX || defaultTeamOne.placeX;
    teamOne.placeY = obj.placeY || defaultTeamOne.placeY;
  }

  if (team === 'two') {
    teamTwo.moveX = obj.moveX || defaultTeamTwo.moveX;
    teamTwo.moveY = obj.moveY || defaultTeamTwo.moveY;
    teamTwo.placeX = obj.placeX || defaultTeamTwo.placeX;
    teamTwo.placeY = obj.placeY || defaultTeamTwo.placeY;
  }
}


const onInputTeamUpdate = (team, updatedTeam) => {
  if (team === 'one') {
    teamOne.moveX = updatedTeam.moveX
    teamOne.moveY = updatedTeam.moveY
    teamOne.placeX = updatedTeam.placeX
    teamOne.placeY = updatedTeam.placeY
  }

  if (team === 'two') {
    teamTwo.moveX = updatedTeam.moveX
    teamTwo.moveY = updatedTeam.moveY
    teamTwo.placeX = updatedTeam.placeX
    teamTwo.placeY = updatedTeam.placeY
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  background: #282d33;
  color: #dcdcdc;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
  padding: 1rem 3rem;
  min-width: 650px;
}

@media screen and (min-width: 1200px) {
  .flex-wrap {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .center-view {
    order: 2;
  }

  .team-one {
    order: 1;
  }

  .team-two {
    order: 3;
  }
}

.team-view {
  padding: 0 1rem;
}

.score-board {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.team-title {
  text-align: center;
}

button {
  padding: 0.5em 1em;
  border: none;
  outline: none;
  background-color: #dad8d8;
}

button:hover,
button:focus {
  cursor: pointer;
  background-color: #c2c2c2;
}

.score-board button {
  margin: 0 5px;
}
</style>
