import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        mon: [],
        tue: [],
        wed: [],
        thu: [],
        fri: [],
        sat: [],
        sun: []
    },
    mutations: {},
    actions: {
      async fetchWeek({commit}, data) {
        const response = await Vue.axios.post('/report/developer/week', data)
        console.log(response)
        // commit('setJobs', data)
        // commit('clearCurrentJob')
      },
    }
})
