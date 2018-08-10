import Vue from 'vue'
import App from './App.vue'
import '../node_modules/reset-css/reset.css';
import './assets/styles/styles.css';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  data: {
    scores: {
      ketchup: 0,
      mayo: 0,
    },
    tossWinner: null
  }
}).$mount('#app')
