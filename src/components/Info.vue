<template>
  <div class="game-info">
    <h3>Rules</h3>
    <ol>
      <li>Capture the most points.</li>
      <li>If two opposing players collide, one will randomly be removed.</li>
      <li>Set and update player positions with code.</li>
    </ol>
    <h3>Available Functions</h3>
    <p>
      <code>Math</code> methods sin, abs, acos, asin, atan, atan2, cbrt, ceil,
      cos, exp, floor, max, min, pow, random, sign, sin, sqrt, tan, trunc, and
      <code>Math.PI</code>
    </p>
    <p>Example: <code>random() * 59</code></p>
    <h3>Examples</h3>
    <p>
      Random Move<br /><pre
        >eyJtb3ZlWCI6Iih2eCA+IDAgPyAoeCA8IDU5ID8gMSA6IC0xKSA6ICh4ID4gMCA/IC0xIDogMSkpICogcmFuZG9tKCkiLCJtb3ZlWSI6Iih2eSA+IDAgPyAoeSA8IDU5ID8gMSA6IC0xKSA6ICh5ID4gMCA/IC0xIDogMSkpICogcmFuZG9tKCkiLCJwbGFjZVgiOiJyYW5kb20oKSAqIDU5IiwicGxhY2VZIjoicmFuZG9tKCkgKiA1OSJ9</pre
      >
    </p>
    <p>Scan Each Line<br /><pre>eyJtb3ZlWCI6Iih2eCA+IDAgPyAoeCA8ICgoaSArIDEpICogNikgID8gMSA6IC0xKSA6ICh4ID4gKGkgKiA2KSA/IC0xIDogMSkpICIsIm1vdmVZIjoieCA+PSAoKGkgKyAxKSAqIDYpID8gKHZ5ID8gMCA6IDEpIDogMCIsInBsYWNlWCI6ImkgKiA2IiwicGxhY2VZIjoiMCJ9</pre></p>
  </div>
</template>

<script>
export default {}
</script>

<style>
.game-info {
  margin: 0 auto;
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
