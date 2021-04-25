<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <div class="flex-wrap">
    <div class="center-view">
      <div class="score-board">
        <h2>{{ teamOneScore }}</h2>
        <div class="game-actions">
          <button @click="play">Play</button>
          <button @click="pause">Pause</button>
          <button @click="reset">Reset</button>
        </div>
        <h2>{{ teamTwoScore }}</h2>
      </div>
      <play-canvas
        :teamOne="teamOnePlayers"
        :teamTwo="teamTwoPlayers"
        :points="points"
      />
    </div>
    <div class="team-view team-one">
      <h2 class="team-title">Team One</h2>
      <team-function-input :team="teamOne" @update="teamOne = $event" />
      <team-code team-number="one" :team="teamOne" :load-team="loadTeam" />
    </div>
    <div class="team-view team-two">
      <h2 class="team-title">Team Two</h2>
      <team-function-input :team="teamTwo" @update="teamTwo = $event" />
      <team-code team-number="two" :team="teamTwo" :load-team="loadTeam" />
    </div>
  </div>

  <p>
    Learn more
    <a href="https://github.com/andrewlaskey/code-sport/blob/main/README.md"
      >README.md</a
    >
  </p>
</template>

<script setup>
import { reactive, ref } from '@vue/reactivity'
import { computed, onMounted } from '@vue/runtime-core'
import PlayCanvas from './components/PlayCanvas.vue'
import TeamFunctionInput from './components/TeamFunctionInput.vue'
import TeamCode from './components/TeamCode.vue'
import { gridUnit } from './common/math'
import {
  createMoveFunction,
  createPlaceFunction,
  decodeTeam,
  encodeTeam,
  placeTeam,
  updateTeam,
} from './common/team'
import { sanitize } from './common/strings'

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md

const teamOne = reactive({
  moveX: '1',
  moveY: '1',
  placeX: 'i * 2',
  placeY: '0',
})

const teamTwo = reactive({
  moveX: '1',
  moveY: '-1',
  placeX: 'i * 2',
  placeY: '59',
})

const teamCodes = reactive({
  one: '',
})

let teamOnePlayers = ref([])
let teamTwoPlayers = ref([])
let points = ref([])
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
  teamOnePlayers.value = updateTeam(
    teamOnePlayers.value,
    teamOneFns.xMoveFn,
    teamOneFns.yMoveFn,
    timer.value
  )
  teamTwoPlayers.value = updateTeam(
    teamTwoPlayers.value,
    teamTwoFns.xMoveFn,
    teamTwoFns.yMoveFn,
    timer.value
  )

  // Check collision
  const collisionIndexes = new Set()

  teamOnePlayers.value.forEach((player) => {
    points.value.forEach((point, index) => {
      if (
        gridUnit(player.x) === gridUnit(point.x) &&
        gridUnit(player.y) === gridUnit(point.y)
      ) {
        teamOneScore.value++
        collisionIndexes.add(index)
      }
    })
  })

  teamTwoPlayers.value.forEach((player) => {
    points.value.forEach((point, index) => {
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
    points.value.splice(index, 1)
  })

  if (points.value.length <= 0) {
    window.cancelAnimationFrame(request)
  }

  request = window.requestAnimationFrame(runSim)
}

const play = () => {
  if (request) {
    window.cancelAnimationFrame(request)
  }
  startTime = new Date()
  timer.value = 0
  teamOneScore.value = 0
  teamTwoScore.value = 0
  teamOnePlayers.value = []
  teamTwoPlayers.value = []
  points.value = []

  teamOneFns.xMoveFn = createMoveFunction(teamOne.moveX)
  teamOneFns.yMoveFn = createMoveFunction(teamOne.moveY)
  teamOneFns.xPlaceFn = createPlaceFunction(teamOne.placeX)
  teamOneFns.yPlaceFn = createPlaceFunction(teamOne.placeY)

  teamTwoFns.xMoveFn = createMoveFunction(teamTwo.moveX)
  teamTwoFns.yMoveFn = createMoveFunction(teamTwo.moveY)
  teamTwoFns.xPlaceFn = createPlaceFunction(teamTwo.placeX)
  teamTwoFns.yPlaceFn = createPlaceFunction(teamTwo.placeY)

  teamOnePlayers.value = placeTeam(10, teamOneFns.xPlaceFn, teamOneFns.yPlaceFn)
  teamTwoPlayers.value = placeTeam(10, teamTwoFns.xPlaceFn, teamTwoFns.yPlaceFn)

  for (let index = 0; index < 10; index++) {
    points.value.push({
      x: Math.random() * 59,
      y: Math.random() * 59,
    })
  }

  request = window.requestAnimationFrame(runSim)
}

const pause = () => {
  window.cancelAnimationFrame(request)
}

const reset = () => {
  if (request) {
    window.cancelAnimationFrame(request)
  }

  teamOneScore.value = 0
  teamTwoScore.value = 0
  teamOnePlayers.value = []
  teamTwoPlayers.value = []
  points.value = []
}

const loadTeam = (team, code) => {
  const obj = decodeTeam(code)

  if (team === 'one') {
    teamOne.moveX = obj.moveX || '1'
    teamOne.moveY = obj.moveY || '1'
    teamOne.placeX = obj.placeX || 'i * 2'
    teamOne.placeY = obj.placeY || '0'
  }

  if (team === 'two') {
    teamTwo.moveX = obj.moveX || '1'
    teamTwo.moveY = obj.moveY || '1'
    teamTwo.placeX = obj.placeX || 'i * 2'
    teamTwo.placeY = obj.placeY || '0'
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  padding: 1rem 3rem;
}

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

.score-board {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

input[type='text'] {
  width: 24em;
}

.row {
  display: flex;
  justify-content: center;
}

.column {
  padding: 0 2em 2em;
}

.team-title {
  text-align: center;
}
</style>
