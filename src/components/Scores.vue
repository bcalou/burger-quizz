<template>
  <div class="scores">
    <ScoresTeam
      class="scores__team"
      team="ketchup"
      v-bind:selected="selected === 'ketchup'"
    ></ScoresTeam>
    <ScoresTeam
      class="scores__team"
      team="mayo"
      v-bind:selected="selected === 'mayo'"
    ></ScoresTeam>
  </div>
</template>

<script>
import ScoresTeam from './ScoresTeam.vue'

export default {
  name: 'Scores',
  components: {
    ScoresTeam
  },
  data: function() {
    return {
      selected: null
    }
  },
  created: function() {
    window.addEventListener('keydown', this.onKeydown);
  },
  destroyed: function() {
    window.removeEventListener('keydown', this.onKeydown);
  },
  methods: {
    onKeydown(event) {
      switch (event.key) {
        case 'k':
          this.selectScore('ketchup');
          break;
        case 'm':
          this.selectScore('mayo');
          break;
        case 'ArrowUp':
          this.updateScore(+1);
          break;
        case 'ArrowDown':
          this.updateScore(-1);
        case ' ':
          this.end();
          break;
        default:
          break;
      }
    },
    updateScore(diff) {
      if (this.selected && this.$root.scores[this.selected] + diff >= 0) {
        this.$root.scores[this.selected] += diff;
      }
    },
    selectScore(team) {
      this.selected = this.selected === team ? null : team;
    },
    end() {
      this.$emit('end');
    }
  }
}
</script>

<style scoped>
.scores {
  display: flex;
  height: 100vh;
}

.scores__team {
  width: 50%;
}
</style>
