<template>
  <div class="code-docs">
    <button @click="isOpen = !isOpen">// {{ isOpen ? 'Close' : 'View' }} Info</button>
    <div v-show="isOpen" class="expand">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isOpen = ref(false);
</script>

<style scoped>
.code-docs {
  font-size: 0.9em;
  font-weight: normal;
  white-space: normal;
}

button,
button:focus  {
  background: none;
  border: none;
  font-family: 'Courier New', monospace;
  color: #6a9956;
  padding: 0;
}

button:hover,
button:active {
  background: none;
  color: #72d049;
}

.expand {
  padding-bottom: 0.5rem;
  font-family: 'Courier New', monospace;
  color: #6a9956;
}
</style>