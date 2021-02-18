import Vue from 'vue';
import dateFilter from '@/filters/date.filter';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.filter('date', dateFilter);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
