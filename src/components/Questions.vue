<template>
  <div class="questions">
    <Scores v-if="showScores"></Scores>
    <Question
      v-else
      v-bind:question="currentQuestion"
      v-on:end="onQuestionEnd()"
    ></Question>
  </div>
</template>

<script>
import Scores from './Scores.vue';
import Question from './Question.vue';

export default {
  name: 'Questions',
  components: {
    Scores,
    Question
  },
  props: {
    questions: Array
  },
  data: function() {
    return {
      showScores: true,
      currentQuestion: null,
      currentQuestionIndex: -1
    }
  },
  created: function() {
    window.addEventListener('keydown', this.onKeydown);
    console.log(this.questions);
  },
  destroyed: function() {
    window.removeEventListener('keydown', this.onKeydown);
  },
  methods: {
    onKeydown(event) {
      if (event.key === ' ') {
        this.showQuestion();
      }
    },
    showQuestion() {
      if (this.showScores) {
        this.nextQuestion();
        this.showScores = false;
      }
    },
    nextQuestion() {
      this.currentQuestion = this.questions[++this.currentQuestionIndex];
      if (!this.currentQuestion) {
        this.end();
      }
    },
    onQuestionEnd() {
      this.showScores = true;
    },
    end() {
      this.$emit('end');
    }
  }
}
</script>

<style scoped>
</style>
