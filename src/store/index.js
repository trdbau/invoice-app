import Vue from 'vue';
import Vuex from 'vuex';

import user from './user.js';
import invoice from './invoice.js';
import utils from './utils.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    invoice,
    utils,
  },
});
