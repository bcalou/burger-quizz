<template>
  <div
    class="scoresTeam"
    v-bind:class="[team, {'scoresTeam--selected': selected}]"
  >
    <div class="scoresTeam__numeric">{{score}}</div>
    <div
      class="scoresTeam__image"
      :style="{ backgroundImage: `url(${imageUrl})` }"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'ScoresTeam',
  props: {
    team: String,
    selected: Boolean
  },
  computed: {
    score: function() {
      const score = this.$root.scores[this.team];

      return score < 10 ? '0' + score : score.toString();
    },
    imageUrl: function() {
      return require(`../assets/img/score-${this.score}.png`);
    }
  }
}
</script>

<style>
.scoresTeam {
  display: flex;
  flex-direction: column;
  padding: 50px 100px;
}

.scoresTeam--selected .scoresTeam__numeric {
  transform: scale(1.1);
}

.scoresTeam__numeric {
  line-height: 30vh;
  font-size: 30vh;
  text-align: center;
  transition: transform 0.2s;
  will-change: transform;
}

.scoresTeam__image {
  height: 70vh;
  background-image: url('../assets/img/score-00.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center bottom;
}
</style>
