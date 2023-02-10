<template>
  <div class="team-input">
    <div class="code-input">
      <p>
        <span class="lang-style-1">function</span>
        <span class="lang-style-2"> placeX</span>(i) {<br />
        <span class="indent lang-style-1">return</span>
      </p>
      <textarea
        :value="props.team.placeX"
        @input="updateTeam(teamNumber, update('placeX', $event.target.value))"
      />
      <p>}</p>
    </div>
    <div class="code-input">
      <p>
        <span class="lang-style-1">function</span>
        <span class="lang-style-2"> placeY</span>(i) {<br />
        <span class="indent lang-style-1">return</span>
      </p>
      <textarea
        :value="props.team.placeY"
        @input="updateTeam(teamNumber, update('placeY', $event.target.value))"
      />
      <p>}</p>
    </div>
    <div class="code-input">
      <p>
        <span class="lang-style-1">function</span>
        <span class="lang-style-2"> moveX</span>(t, i, x, y, vx, vy) {<br />
        <span class="indent lang-style-1">return</span>
      </p>
      <textarea
        :value="props.team.moveX"
        @input="updateTeam(teamNumber, update('moveX', $event.target.value))"
      />
      <p>}</p>
    </div>
    <div class="code-input">
      <p>
        <span class="lang-style-1">function</span>
        <span class="lang-style-2"> moveY</span>(t, i, x, y, vx, vy) {<br />
        <span class="indent lang-style-1">return</span>
      </p>
      <textarea
        :value="props.team.moveY"
        @input="updateTeam(teamNumber, update('moveY', $event.target.value))"
      />
      <p>}</p>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from '@vue/runtime-core'

const props = defineProps({
  teamNumber: {
    type: String,
    default: 'one',
  },
  team: {
    type: Object,
    default: () => ({
      placeX: 'i * 2',
      placeY: 'i',
      moveX: '1',
      moveY: '1',
    }),
  },
  updateTeam: {
    type: Function,
    default: () => ({}),
  },
})

const emit = defineEmits(['update:team'])

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
  white-space: pre;
}

.code-input p {
  margin: 0;
}

.code-input .indent {
  padding-left: 1em;
}

.code-input textarea {
  margin-left: 1em;
  padding: 0.5em;
  border: none;
  background: #383e42;
  color: #dcdcdc;
  width: calc(100% - 1em);
  min-height: 3em;
}

.code-input .lang-style-1 {
  color: #bd75d3;
}

.code-input .lang-style-2 {
  color: #4a909a;
}
</style>
