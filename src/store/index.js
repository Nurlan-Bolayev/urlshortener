import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    fetchingUserPromise: null,
  },
  mutations: {
    setFetchingUserPromise(state, fetchingUserPromise) {
      state.fetchingUserPromise = fetchingUserPromise
    },

    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    async fetchUser({state, commit}) {
      // If we are already fetching or fetched user, wait for it instead of re-requesting the user
      if (state.fetchingUserPromise != null) {
        return state.fetchingUserPromise
      }

      let fulfill;
      const promise = new Promise(resolve => fulfill = resolve)

      commit('setFetchingUserPromise', promise);
      try {
        const {data} = await axios.get('api/users/me');

        commit('setUser', data);
      } finally {
        fulfill();
      }
    }
  },
  modules: {}
})
