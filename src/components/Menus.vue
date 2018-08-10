<template>
  <div class="menus">
    <div v-if="!selected" class="menus__inner">
      <div class="menus__corner menus__corner--topLeft"></div>
      <div class="menus__corner menus__corner--topRight"></div>
      <div class="menus__corner menus__corner--bottomLeft"></div>
      <div class="menus__corner menus__corner--bottomRight"></div>
      <div class="menus__title">MENUS</div>
      <ol class="menus__menus">
        <li
          v-for="(menu, key) in phase.menus"
          :key="menu.title"
          class="menus__menu"
          v-bind:class="{
            'menus__menu--visible': shown > letters.indexOf(key)
          }"
        >
          <span class="menus__menuKey">{{key}}</span>
          <span class="menus__menuTitle">{{menu.title}}</span>
        </li>
      </ol>
    </div>
    <Questions
      v-else
      v-bind:questions="selected.questions"
      v-on:end="onMenuEnded()"
    ></Questions>
  </div>
</template>

<script>
import Questions from './Questions.vue';

export default {
  name: 'Menus',
  components: {
    Questions
  },
  props: {
    phase: Object
  },
  data: function() {
    return {
      letters: ['a', 'b', 'c'],
      shown: 0,
      playedMenus: 0,
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
      if (event.key === ' ') {
        this.shown++;
      }
      if (this.phase.menus[event.key]) {
        this.selected = this.phase.menus[event.key];
      }
    },
    onMenuEnded() {
      this.selected = null;
      this.playedMenus++;

      if (this.playedMenus === 2) {
        this.$emit('end');
      }
    }
  }
}
</script>

<style scoped>
.menus__inner {
  background: rgb(24, 204, 63);
  color: black;
  height: 100vh;
  padding: 120px 150px 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.menus__inner::before {
  height: 90vh;
  width: 90vw;
  top: 5vh;
  left: 5vw;
  background: white;
  display: block;
  content: '';
  position: absolute;
}

.menus__corner {
  height: 100px;
  width: 100px;
  background: rgb(24, 204, 63);
  display: block;
  position: absolute;
}

.menus__corner::before {
  content: '';
  display: block;
  position: absolute;
  height: 200px;
  width: 200px;
  background: white;
  border-radius: 50%;
}

.menus__corner--topLeft {
  left: 5vw;
  top: 5vh;
}

.menus__corner--topLeft::before {
  left: 0;
  top: 0;
}

.menus__corner--bottomLeft {
  left: 5vw;
  bottom: 5vh;
}

.menus__corner--bottomLeft::before {
  left: 0;
  bottom: 0;
}

.menus__corner--topRight {
  right: 5vw;
  top: 5vh;
}

.menus__corner--topRight::before {
  right: 0;
  top: 0;
}

.menus__corner--bottomRight {
  right: 5vw;
  bottom: 5vh;
}

.menus__corner--bottomRight::before {
  right: 0;
  bottom: 0;
}

.menus__title {
  font-size: 180px;
  color: black;
  z-index: 1;
  text-align: center;
}

.menus__menus {
  padding: 25px 0 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
}

.menus__menu {
  visibility: hidden;
  position: relative;
}

.menus__menu--visible {
  visibility: visible;
}

.menus__menuKey {
  font-size: 130px;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}

.menus__menuTitle {
  font-family: Purisa;
  font-size: 60px;
  margin-left: 100px;
  display: block;
  line-height: 1.3;
}
</style>
