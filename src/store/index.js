import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/axios';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user : null,
  },
  mutations: {
    setUser(state,user){
      state.user = user;
    }
  },
  actions: {
    async fetchUser({commit}){
      const {data} = await axios.get('api/users/me');
      commit('setUser' , data);
    }
  },
  modules: {
  }
})
