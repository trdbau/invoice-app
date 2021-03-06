/* eslint-disable no-param-reassign */
import firebase from 'firebase';
import Services from '@/Services';
import { LOG_IN, LOG_OUT } from './constance.js';

const user = {
  namespaced: true,
  state: {
    userInfo: {},
    isAuthenticated: false,
  },
  mutations: {
    [LOG_IN]: (_state, userInfo) => {
      _state.isAuthenticated = true;
      _state.userInfo = userInfo;
    },
    [LOG_OUT]: (_state) => {
      _state.isAuthenticated = false;
      _state.userInfo = {};
    },
  },
  actions: {
    async checkLogin({ commit }, params) {
      const { email, password } = params;
      commit('utils/SET_LOADING', true, { root: true });

      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
          commit('LOG_IN', result.user);
        })
        .catch(() => {
          commit('utils/SET_ERROR', 'Wrong email or password!', { root: true });
        })
        .then(() => {
          setTimeout(() => {
            commit('utils/SET_LOADING', false, { root: true });
            commit('utils/SET_ERROR', '', { root: true });
          }, 0);
        });
    },
    async getInfoUser({ commit }) {
      commit('utils/SET_LOADING', true, { root: true });
      const info = await Services.getInfo();

      if (info.uid) commit('LOG_IN', info);
      else commit('utils/SET_ERROR', 'Wrong token', { root: true });

      setTimeout(() => {
        commit('utils/SET_LOADING', false, { root: true });
        commit('utils/SET_ERROR', '', { root: true });
      }, 0);
    },
    logout({ commit }) {
      commit('utils/SET_LOADING', true, { root: true });
      commit('LOG_OUT');
      setTimeout(() => {
        commit('utils/SET_LOADING', false, { root: true });
      }, 0);
    },
  },
};

export default user;
