import Vue from 'vue';
// import api from '@/services/api';
import { flatRecepies, sortBy } from '@/helpers';

export default {
  namespaced: true,
  state: {
    recepies: {},
    sortedMainRecepies: [],
  },
  getters: {
    recepies: (state) => state.recepies,
    sortedMainRecepies: (state) => state.sortedMainRecepies,
  },
  mutations: {
    setRecepies(state, recepies) {
      state.recepies = recepies;
    },
    setSortedRecepies(state, sortedMainRecepies) {
      state.sortedMainRecepies = sortedMainRecepies;
    },
    addRecepie(state, recepie) {
      Vue.set(state.recepies, recepie.id, recepie);
    },
    addSortedRecepies(state, sortedRecepies) {
      state.sortedMainRecepies = sortedRecepies;
    },
    addChildRecepies(state, payload) {
      state.recepies[payload.id].childrens = payload.sortedRecepies;
    },
    editRecepie(state, recepie) {
      Vue.set(state.recepies, recepie.id, recepie);
    },
    deleteRecepie(state, recepieId) {
      if (state.recepies[recepieId].parentId === '') {
        console.log('removeeee', recepieId);
        state.sortedMainRecepies = state.sortedMainRecepies.filter((r) => r !== recepieId);
      }
      Vue.delete(state.recepies, recepieId);
    },
    deleteFromParent(state, payload) {
      const parent = state.recepies[payload.parentId].childrens;
      const updatedParent = parent.filter((el) => el !== payload.id);
      state.recepies[payload.parentId].childrens = updatedParent;
    },
    resetState(state) {
      state.recepies = {};
      state.sortedRecepies = [];
    },
  },
  actions: {
    async getInitialState({ dispatch }) {
      await Promise.all([dispatch('getRecepies'), dispatch('getSortedRecepies')]);
    },
    async getRecepies({ commit }) {
      try {
        const responseRecepies = await localStorage.getItem('recepies');
        const recepies = JSON.parse(responseRecepies) || {};
        commit('setRecepies', recepies);
        return responseRecepies;
      } catch (e) {
        return e;
      }
    },
    async getSortedRecepies({ commit }) {
      try {
        const responseSorted = await localStorage.getItem('sortedMainRecepies');
        const sortedMainRecepies = JSON.parse(responseSorted) || [];
        commit('setSortedRecepies', sortedMainRecepies);
        return responseSorted;
      } catch (e) {
        return e;
      }
    },
    async addRecepie({ dispatch, commit }, recepie) {
      try {
        // const response = await api.recepies.create(recepie);
        commit('addRecepie', recepie);
        dispatch('sortRecepies', recepie);
        await dispatch('saveToStorage');
      } catch (e) {
        console.error(e);
      }
    },
    async editRecepie({ dispatch, commit }, recepie) {
      try {
        // const response = await api.recepies.update(recepie);
        commit('addRecepie', recepie);
        dispatch('sortRecepies', recepie);
        await dispatch('saveToStorage');
      } catch (e) {
        console.error(e);
      }
    },
    async deleteRecepie({ dispatch, commit, state }, recepie) {
      try {
        // const response = await api.recepies.delete(recepie.id);
        if (recepie.parentId !== '') commit('deleteFromParent', recepie);
        const recepiesToRemove = flatRecepies(recepie.childrens, recepie.id, state.recepies);
        recepiesToRemove.forEach((key) => {
          commit('deleteRecepie', key);
        });
        await dispatch('saveToStorage');
      } catch (e) {
        console.error(e);
      }
    },
    async saveToStorage({ state }) {
      await localStorage.setItem('recepies', JSON.stringify(state.recepies));
      await localStorage.setItem('sortedMainRecepies', JSON.stringify(state.sortedMainRecepies));
    },
    sortRecepies({ commit, state }, recepie) {
      const isMainRecepie = (recepie.parentId === '');
      if (isMainRecepie) {
        const recepiesCopy = state.sortedMainRecepies.slice();
        if (recepiesCopy.indexOf(recepie.id) < 0) recepiesCopy.push(recepie.id);
        const sortedRecepies = sortBy('title', recepiesCopy, state.recepies);
        commit('addSortedRecepies', sortedRecepies);
      } else {
        const childRecepies = state.recepies[recepie.parentId].childrens.slice();
        if (childRecepies.indexOf(recepie.id) < 0) childRecepies.push(recepie.id);
        const sortedRecepies = sortBy('title', childRecepies, state.recepies);
        commit('addChildRecepies', { id: recepie.parentId, sortedRecepies });
      }
    },
  },
};
