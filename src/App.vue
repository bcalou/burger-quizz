<template>
  <div class="app">
    <link
      v-for="url in scoreImageUrls"
      :key="url"
      rel="preload"
      :href="url"
      as="image"
    >
    <div v-if="started">
      <Title
        v-if="showTitle"
        v-on:end="onTitleEnd()"
        v-bind:phase="currentPhase"
      ></Title>
      <div v-else>
        <Questions
          v-if="currentPhase && currentPhase.title === 'nuggets'"
          v-bind:questions="currentPhase.questions"
          v-on:end="nextPhase()"
        ></Questions>
        <Menus
          v-if="currentPhase && currentPhase.title === 'menus'"
          v-bind:phase="currentPhase"
          v-on:end="nextPhase()"
        ></Menus>
        <Scores
          v-if="currentPhase && (currentPhase.title === 'selOuPoivre' || currentPhase.title === 'addition')"
          v-on:end="nextPhase()"
        ></Scores>
      </div>
    </div>
  </div>
</template>

<script>
import nuggets from './assets/data/nuggets.js';
import menus from './assets/data/menus.js';
import Questions from './components/Questions.vue';
import Menus from './components/Menus.vue';
import Scores from './components/Scores.vue'
import Title from './components/Title.vue';

export default {
  name: 'app',
  components: {
    Scores,
    Questions,
    Title,
    Menus
  },
  data: function() {
    return {
      currentPhaseIndex: -1,
      currentPhase: null,
      phases: [
        {
          title:'nuggets',
          questions: nuggets
        },
        {
          title: 'selOuPoivre'
        },
        {
          title: 'menus',
          menus: menus
        },
        {
          title: 'addition'
        },
        {
          title: 'burgerDeLaMort'
        }
      ],
      showTitle: true,
      started: false
    }
  },
  computed: {
    scoreImageUrls: function() {
      return Array.apply(null, {length: 26})
        .map(Number.call, Number)
        .map(index => {
          var score = index < 10 ? '0' + index : index.toString();

          return require(`./assets/img/score-${score}.png`);
        });
    }
  },
  created: function() {
    window.addEventListener('keydown', this.onKeydown);
  },
  destroyed: function() {
    window.removeEventListener('keydown', this.onKeydown);
  },
  methods: {
    nextPhase() {
      this.currentPhase = this.phases[++this.currentPhaseIndex];
      this.showTitle = true;
    },
    onTitleEnd() {
      this.showTitle = false;

      if (!this.currentPhase) {
        this.nextPhase();
      }
    },
    onKeydown(event) {
      if (event.key === ' ') {
        this.start();
      }
    },
    start() {
      this.started = true;
    }
  }
}
</script>

<style>
</style>
