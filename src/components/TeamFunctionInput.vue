<template>
  <div class="team-input">
    <div class="code-input">
      <p>
        function placeX(i) {<br />
        <span class="indent">return</span>
      </p>
      <textarea
        :value="props.team.placeX"
        @input="$emit('update', update('placeX', $event.target.value))"
      />
      <p>}</p>
    </div>
    <div class="code-input">
      <p>
        function placeY(i) {<br />
        <span class="indent">return</span>
      </p>
      <textarea
        :value="props.team.placeY"
        @input="$emit('update', update('placeY', $event.target.value))"
      />
      <p>}</p>
    </div>
    <div class="code-input">
      <p>
        function moveX(t, i, x, y, vx, vy) {<br />
        <span class="indent">return</span>
      </p>
      <textarea
        :value="props.team.moveX"
        @input="$emit('update', update('moveX', $event.target.value))"
      />
      <p>}</p>
    </div>
    <div class="code-input">
      <p>
        function moveX(t, i, x, y, vx, vy) {<br />
        <span class="indent">return</span>
      </p>
      <textarea
        :value="props.team.moveY"
        @input="$emit('update', update('moveY', $event.target.value))"
      />
      <p>}</p>
    </div>
  </div>
</template>

<script setup>
import { defineEmit, defineProps } from '@vue/runtime-core'

const props = defineProps({
  team: {
    type: Object,
    default: () => ({
      placeX: 'i * 2',
      placeY: 'i',
      moveX: '1',
      moveY: '1',
    }),
  },
})

defineEmit('update')

const update = (key, value) => {
  return {
    ...props.team,
    [key]: value,
  }
}
</script>

<style>
.code-input {
  padding-bottom: 1rem;
  text-align: left;
  font-family: 'Courier New', monospace;
  font-weight: bold;
}

.code-input p {
  margin: 0;
}

.code-input .indent {
  padding-left: 1em;
}

.code-input textarea {
  margin-left: 1em;
  border: none;
  background: #ecdfc7;
  width: 100%;
  min-height: 3em;
}
</style>
