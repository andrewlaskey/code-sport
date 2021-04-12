<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <play-canvas
    :teamOne="teamOnePlayers"
    :teamTwo="teamTwoPlayers"
    :points="points"
  />
  <div class="row">
    <div class="column">
      <h2>{{ teamOneScore }}</h2>
      <div>
        <label>Place X</label><input v-model="teamOne.placeX" type="text" />
      </div>
      <div>
        <label>Place Y</label><input v-model="teamOne.placeY" type="text" />
      </div>
      <div>
        <label>Move X</label><input v-model="teamOne.moveX" type="text" />
      </div>
      <div>
        <label>Move Y</label><input v-model="teamOne.moveY" type="text" />
      </div>
      <div>
        <label>Team code</label>
        <input :value="teamOneCode" type="text" readonly="readonly" /><br />
        <input v-model="teamCodes.one" type="text" />
        <button @click="loadTeam('one', teamCodes.one)">Load Team</button>
      </div>
    </div>
    <div class="column">
      <h2>{{ teamTwoScore }}</h2>
      <div>
        <label>Place X</label><input v-model="teamTwo.placeX" type="text" />
      </div>
      <div>
        <label>Place Y</label><input v-model="teamTwo.placeY" type="text" />
      </div>
      <div>
        <label>Move X</label><input v-model="teamTwo.moveX" type="text" />
      </div>
      <div>
        <label>Move Y</label><input v-model="teamTwo.moveY" type="text" />
      </div>
      <div>
        <label>Team code</label>
        <input :value="teamTwoCode" type="text" readonly="readonly" /><br />
        <input v-model="teamCodes.two" type="text" />
        <button @click="loadTeam('two', teamCodes.two)">Load Team</button>
      </div>
    </div>
  </div>
  <button @click="play">Play</button>
  <button @click="pause">Pause</button>
  <button @click="reset">Reset</button>
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
import { gridUnit } from './common/math'
import { decodeTeam, encodeTeam, updateTeam } from './common/team'

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

const teamOneFuncs = {}
const teamTwoFuncs = {}
let request
let timer

const teamOneCode = computed(() => encodeTeam(teamOne))
const teamTwoCode = computed(() => encodeTeam(teamTwo))

const createMoveFunction = (fnString) => {
  let saferStr = fnString
    .replace('alert', '')
    .replace('dialog', '')
    .replace('location', '')
    .replace('confirm', '')
    .replace('download', '')
    .replace('eval', '')
    .replace('console', '')
    .replace('fetch', '')
    .replace('print', '')
    .replace('prompt', '')
    .replace('open', '')
    .replace('close', '')
    .substring(0, 140)
  return new Function(
    't',
    'i',
    'x',
    'y',
    'vx',
    'vy',
    `
    try {
      with (Math) {
        return ${saferStr};
      }
    } catch (error) {
      return error;
    }
  `
  )
}

const createPlaceFunction = (fnString) => {
  let saferStr = fnString
    .replace('alert', '')
    .replace('dialog', '')
    .replace('location', '')
    .replace('confirm', '')
    .replace('download', '')
    .replace('eval', '')
    .replace('console', '')
    .replace('fetch', '')
    .replace('print', '')
    .replace('prompt', '')
    .replace('open', '')
    .replace('close', '')
    .substring(0, 140)
  return new Function(
    'i',
    `
    try {
      with (Math) {
        return ${saferStr};
      }
    } catch (error) {
      return error;
    }
  `
  )
}

const runSim = () => {
  timer = (new Date() - timer) / 1e3
  teamOnePlayers.value = updateTeam(
    teamOnePlayers.value,
    teamOneFuncs.moveX,
    teamOneFuncs.moveY,
    timer
  )
  teamTwoPlayers.value = updateTeam(
    teamTwoPlayers.value,
    teamTwoFuncs.moveX,
    teamTwoFuncs.moveY,
    timer
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

  request = window.requestAnimationFrame(runSim)
}

const play = () => {
  if (request) {
    window.cancelAnimationFrame(request)
  }

  timer = new Date()
  teamOneScore.value = 0
  teamOnePlayers.value = []
  teamTwoPlayers.value = []
  points.value = []

  teamOneFuncs.placeX = createPlaceFunction(teamOne.placeX)
  teamOneFuncs.placeY = createPlaceFunction(teamOne.placeY)
  teamOneFuncs.moveX = createMoveFunction(teamOne.moveX)
  teamOneFuncs.moveY = createMoveFunction(teamOne.moveY)

  teamTwoFuncs.placeX = createPlaceFunction(teamTwo.placeX)
  teamTwoFuncs.placeY = createPlaceFunction(teamTwo.placeY)
  teamTwoFuncs.moveX = createMoveFunction(teamTwo.moveX)
  teamTwoFuncs.moveY = createMoveFunction(teamTwo.moveY)

  for (let index = 0; index < 10; index++) {
    teamOnePlayers.value.push({
      x: teamOneFuncs.placeX(index),
      y: teamOneFuncs.placeY(index),
    })

    teamTwoPlayers.value.push({
      x: teamTwoFuncs.placeX(index),
      y: teamTwoFuncs.placeY(index),
    })

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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
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
</style>
