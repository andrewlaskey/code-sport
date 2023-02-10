<template>
  <div>
    <h3>Team Examples</h3>
    <div class="team-select">
    <select v-model="selected">
      <option v-for="example in examples" :key="example.code" :value="example">{{ example.name }}</option>
    </select>
    <button @click="copyTeamCode(selected.code)" type="button">{{ buttonText }}</button>
    </div>
    <pre>{{ selected.code }}</pre>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';

const examples = [
  {
    name: 'Random Move',
    code: 'eyJtb3ZlWCI6InJldHVybiByZW1hcChyYW5kb20oKSwgMCwgMSwgLTEsIDEpIiwibW92ZVkiOiJyZXR1cm4gcmVtYXAocmFuZG9tKCksIDAsIDEsIC0xLCAxKSIsInBsYWNlWCI6InJldHVybiByYW5kb20oKSAqIDU5IiwicGxhY2VZIjoicmV0dXJuIHJhbmRvbSgpICogNTkifQ=='
  },
  {
    name: 'Scan Each Line',
    code: 'eyJtb3ZlWCI6ImNvbnN0IGRpcyA9IChHQU1FX1NJWkUgLyB0ZWFtU2l6ZSk7XG5cbmlmICh2eCA+IDApIHtcbiBpZiAoeCA8IChpICsgMSkgKiBkaXMpIHtcbiAgIHJldHVybiAxO1xuIH1cbiByZXR1cm4gLTE7XG59IGVsc2Uge1xuIGlmICh4ID4gaSAqIGRpcykge1xuICByZXR1cm4gLTE7XG4gfVxufVxuXG5yZXR1cm4gMTsiLCJtb3ZlWSI6ImNvbnN0IGRpcyA9IChHQU1FX1NJWkUgLyB0ZWFtU2l6ZSk7XG5cbmlmICh4ID49IChpICsgMSkgKiBkaXMpIHtcbiBpZiAodnkpIHtcbiAgcmV0dXJuIDA7XG4gfSBcbiByZXR1cm4gMTtcbn1cbnJldHVybiAwOyIsInBsYWNlWCI6InJldHVybiBpICogKEdBTUVfU0laRSAvIHRlYW1TaXplKSIsInBsYWNlWSI6InJldHVybiAwIn0='
  }
];

let selected = reactive(examples[0]);
let buttonText = ref('Select');

const copyTeamCode = (code) => {
  navigator.clipboard.writeText(code).then(() => {
    buttonText.value = 'Copied';

    setTimeout(() => {
      buttonText.value = 'Select'
    }, 3 * 1000);
  })
}

const updateSelect = (event) => {
  selected = event.target.value
}
</script>

<style>
.team-select {
  display: flex;
  align-items: flex-start;
}

.team-select select {
  flex-grow: 1;
  padding: 0.5em;
  border: none;
  width: 100%;
  background: #383e42;
  color: #dcdcdc;
  font-family: 'Couier New', monospace;
}

.team-select button {
  width: 6em
}
</style>