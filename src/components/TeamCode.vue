<template>
  <div class="team-code">
    <h4>Team Code</h4>
    <p>Copy to share with other players</p>
    <input
      class="share-code"
      :value="teamCode"
      type="text"
      readonly="readonly"
    />
    <div class="load-team">
      <input v-model="loadTeamCode" type="text" />
      <button @click="loadTeam(props.teamNumber, loadTeamCode)">
        Load Team
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, ref } from '@vue/runtime-core'
import { encodeTeam } from '../common/team'

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
  loadTeam: {
    type: Function,
    default: () => ({}),
  },
})

const teamCode = computed(() => encodeTeam(props.team))

const loadTeamCode = ref('')
</script>

<style>
.team-code {
  width: 100%;
}

.team-code h4 {
  margin-bottom: 0;
}

.team-code p {
  margin-top: 0;
}

.team-code input[type='text'] {
  padding: 0.5em;
  border: none;
  width: 100%;
  background: #383e42;
  color: #dcdcdc;
  font-family: 'Couier New', monospace;
}

.load-team {
  display: flex;
  padding: 1rem 0;
}

.load-team button {
  flex-shrink: 0;
}
</style>
