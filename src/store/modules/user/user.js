import { state } from './state'
import { mutations } from './mutations'
import { actions } from './actions'

const getters = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
