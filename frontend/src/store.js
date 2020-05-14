import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        week: {
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: []
        }
    },
    mutations: {
        setJob(state, job) {
            state.week[job.day].push(job)
        },
        clearWeek(state) {
            state.week = {
                1: [],
                2: [],
                3: [],
                4: [],
                5: [],
                6: [],
                7: []
            }
        },
        clearDay(state, day) {
            state.week[day] = []
        }
    },
    actions: {
        async fetchWeek({commit}, params) {
            commit('clearWeek')
            const {data} = await Vue.axios.post('/report/developer/week', params)
            data.week
                .map(job => {
                    let day = new Date(job.date).getDay();
                    if (day) job.day = day
                    return job
                })
                .forEach(job => commit('setJob', job))

        },
        async fetchDay({commit}, params) {

            const day = new Date(params.date).getDay()
            commit('clearDay', day)
            const {data} = await Vue.axios.post('/report/developer/day', params)
            data.day
                .map(job => {
                    let day = new Date(job.date).getDay();
                    if (day) job.day = day
                    return job
                })
                .forEach(job => commit('setJob', job))
        },

        postLinkedInStats: async (store, payload) => {
            try {
              const reqBody = {
                data: payload,
              };
              const response = await Vue.axios.post('/reports/linked-in', reqBody);
            } catch (err) {
              console.log(err);
            }
          },
          getLinkedInReports: async (store, payload) => {
            try {
              const { data: stats } = await Vue.axios.get('/reports/linked-in');

              return stats;
            } catch (err) {
              console.log(err);
            }
          }
    },
    getters: {
        week: s => s.week
    }
})
