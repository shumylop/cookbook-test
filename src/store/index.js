import Vue from 'vue';
import Vuex from 'vuex';

import recepies from './recepies';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    recepies,
  },
});
