<template>
  <div class="team-input">
    <div class="code-input">
      <p>
        <span class="lang-style-1">function</span>
        <span class="lang-style-2"> placeX</span>(i) {<br />
      </p>
      <code-docs>// Initial player placement on x-axis.
        <br>// i: player index
        <br>// @returns any number
      </code-docs>
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
      </p>
      <code-docs>// Initial player placement on y-axis.
        <br>// i: player index
        <br>// @returns any number
      </code-docs>
      <textarea
        :value="props.team.placeY"
        @input="updateTeam(teamNumber, update('placeY', $event.target.value))"
      />
      <p>}</p>
    </div>
    <div class="code-input">
      <p>
        <span class="lang-style-1">function</span>
        <span class="lang-style-2"> moveX</span>(t, i, x, y, vx, vy, neighbors) {<br />
      </p>
      <code-docs>// Updates player x-position each tick.
        <br>// t: total time elapsed
        <br>// i: player index
        <br>// x: current x-position
        <br>// y: current y-position
        <br>// vx: previous move update x-axis
        <br>// vy: previous move update y-axis
        <br>// neighbors: flags {x,y} within 6 units
        <br>// @returns 0, 1, or -1
      </code-docs>
      <textarea
        :value="props.team.moveX"
        @input="updateTeam(teamNumber, update('moveX', $event.target.value))"
      />
      <p>}</p>
    </div>
    <div class="code-input">
      <p>
        <span class="lang-style-1">function</span>
        <span class="lang-style-2"> moveY</span>(t, i, x, y, vx, vy, neighbors) {<br />
      </p>
      <code-docs>// Updates player y-position each tick.
        <br>// t: total time elapsed
        <br>// i: player index
        <br>// x: current x-position
        <br>// y: current y-position
        <br>// vx: previous move update x-axis
        <br>// vy: previous move update y-axis
        <br>// neighbors: flags {x,y} within 6 units
        <br>// @returns 0, 1, or -1
      </code-docs>
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
import CodeDocs from './CodeDocs.vue';

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
  min-height: 5em;
}

.code-input .lang-style-1 {
  color: #bd75d3;
}

.code-input .lang-style-2 {
  color: #4a909a;
}
</style>
