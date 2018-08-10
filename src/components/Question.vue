<template>
  <div class="question">
    <div class="question__corner question__corner--topLeft"></div>
    <div class="question__corner question__corner--topRight"></div>
    <div class="question__corner question__corner--bottomLeft"></div>
    <div class="question__corner question__corner--bottomRight"></div>
    <p
      class="question__title"
      v-bind:class="{
        'question__title--only': !question.answers
      }"
    >{{question.question.text}}</p>
    <ol v-if="question.answers" class="question__answers">
      <li
        v-for="(answer, key) in question.answers"
        :key="answer.text"
        class="question__answer"
        v-bind:class="{
          'question__answer--visible': shown > letters.indexOf(key),
          'question__answer--correct': response && answer.correct,
          'question__answer--incorrect': response === key && !answer.correct
        }"
      >
        <span class="question__answerKey">{{key}}</span>
        <span class="question__answerText">{{answer.text}}</span>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: 'Question',
  props: {
    question: Object
  },
  data: function() {
    return {
      letters: ['a', 'b', 'c', 'd'],
      response: null,
      shown: 0
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
      console.log();
      if (event.key === ' ') {
        if (!this.response) {
          if (this.question.answers) {
            this.shown++;
          } else {
            this.end();
          }
        } else {
          this.end();
        }
      } else if (this.question.answers && this.question.answers[event.key]) {
        this.selectResponse(event.key);
      }
    },
    selectResponse(key) {
      if (!this.response) {
        this.response = key;
      }
    },
    end() {
      this.$emit('end');
    }
  }
}
</script>

<style scoped>
.question {
  background: rgb(24, 204, 63);
  color: black;
  height: 100vh;
  padding: 120px 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.question::before {
  height: 90vh;
  width: 90vw;
  top: 5vh;
  left: 5vw;
  background: white;
  display: block;
  content: '';
  position: absolute;
}

.question__corner {
  height: 100px;
  width: 100px;
  background: rgb(24, 204, 63);
  display: block;
  position: absolute;
}

.question__corner::before {
  content: '';
  display: block;
  position: absolute;
  height: 200px;
  width: 200px;
  background: white;
  border-radius: 50%;
}

.question__corner--topLeft {
  left: 5vw;
  top: 5vh;
}

.question__corner--topLeft::before {
  left: 0;
  top: 0;
}

.question__corner--bottomLeft {
  left: 5vw;
  bottom: 5vh;
}

.question__corner--bottomLeft::before {
  left: 0;
  bottom: 0;
}

.question__corner--topRight {
  right: 5vw;
  top: 5vh;
}

.question__corner--topRight::before {
  right: 0;
  top: 0;
}

.question__corner--bottomRight {
  right: 5vw;
  bottom: 5vh;
}

.question__corner--bottomRight::before {
  right: 0;
  bottom: 0;
}

.question__title {
  font-family: Purisa;
  font-weight: bold;
  font-size: 60px;
  text-align: center;
  margin-bottom: 100px;
  z-index: 1;
  padding: 0 120px;
  line-height: 1.3;
}

.question__title--only {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 100%;
}

.question__answers {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
}

.question__answer {
  visibility: hidden;
  position: relative;
}

.question__answer--visible {
  visibility: visible;
}

.question__answerKey {
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}

.question__answer--correct {
  color: green;
}

.question__answer--incorrect {
  color: red;
}

.question__answerText {
  font-family: Purisa;
  font-size: 50px;
  margin-left: 100px;
  display: block;
  line-height: 1.3;
}
</style>
