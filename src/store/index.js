import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import user from './modules/user/user'
import employee from './modules/employee/employee'
import store from './modules/store/store'
import task from './modules/task/task'

export default new Vuex.Store({
  modules: {
    user,
    employee,
    store,
    task,
  },
})
