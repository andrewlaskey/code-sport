<template>
  <div class="game-info">
    <h3>Rules</h3>
    <ol>
      <li>Capture the most points.</li>
      <li>If two opposing players collide, one will randomly be removed.</li>
      <li>Set and update player positions with code.</li>
      <li>If nothing happens for 30s, game will end.</li>
    </ol>
    <h3>Available Functions and Variables</h3>
    <p>
      <code>Math</code> methods sin, abs, acos, asin, atan, atan2, cbrt, ceil,
      cos, exp, floor, max, min, pow, random, sign, sin, sqrt, tan, and trunc
    </p>
    <p>
      <code>GAME_SIZE</code>: constant representing size of field in units<br>
      <code>teamSize</code>: current number of active players on team<br>
      <code>teamScore</code>: current team score<br>
    </p>
    <p>Example: <code>random() * GAME_SIZE</code></p>
    <team-example-list />
  </div>
</template>

<script setup>
import TeamExampleList from './TeamExampleList.vue';
</script>

<style>
.game-info {
  margin: 0 auto;
  padding: 1rem;
  width: 600px;
}

.game-info pre {
  white-space: pre-wrap;       /* css-3 */
 white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
 white-space: -pre-wrap;      /* Opera 4-6 */
 white-space: -o-pre-wrap;    /* Opera 7 */
 word-wrap: break-word;       /* Internet Explorer 5.5+ */
}
</style>
