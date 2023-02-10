<template>
  <canvas :width="sizeInPx" :height="sizeInPx" id="c" />
</template>

<script setup>
import { onMounted, onUpdated } from '@vue/runtime-core'
import { GAME_SIZE } from '../common/constants';
import { gridUnit } from '../common/math'

let canvasEl
let ctx

const gridSizeInPx = 10
const sizeInPx = GAME_SIZE * gridSizeInPx


// function drawLine(startX, startY, endX, endY) {
//   ctx.fillStyle = 'black'
//   ctx.beginPath()
//   ctx.moveTo(startX, startY)
//   ctx.lineTo(endX, endY)
//   ctx.stroke()
// }

// function grid() {
//   if (ctx) {
//     for (let index = 0; index < size / gridSize; index++) {
//       drawLine(0, index * gridSize, size, index * gridSize)
//       drawLine(index * gridSize, 0, index * gridSize, size)
//     }
//   }
// }

function drawObj(x, y, color) {
  if (ctx) {
    ctx.fillStyle = color
    ctx.fillRect(gridUnit(x) * 10, gridUnit(y) * 10, gridSizeInPx, gridSizeInPx)
  }
}

function draw(teamOne, teamTwo, points) {
  ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)
  // grid()

  teamOne.forEach((player) => {
    drawObj(player.x, player.y, '#d56871') // red
  })

  teamTwo.forEach((player) => {
    drawObj(player.x, player.y, '#62afee') // blue
  })

  points.forEach((point) => {
    drawObj(point.x, point.y, '#8fb874') // green
  })
}

function initCanvas() {
  canvasEl = document.getElementById('c')
  ctx = canvasEl.getContext('2d')
}

const props = defineProps({
  teamOne: {
    type: Array,
    default: () => [],
  },
  teamTwo: {
    type: Array,
    default: () => [],
  },
  points: {
    type: Array,
    default: () => [],
  },
})

onMounted(() => {
  if (!ctx) {
    initCanvas()
  }

  draw(props.teamOne, props.teamTwo, props.points)
})

onUpdated(() => {
  if (!ctx) {
    initCanvas()
  }

  draw(props.teamOne, props.teamTwo, props.points)
})
</script>

<style>
canvas {
  /* border: 1px solid; */
  background: #21262a;
}
</style>
