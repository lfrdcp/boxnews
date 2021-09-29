export const mutations = {
  setUser(state, payload) {
    state.user = payload
  },
  setUserServerMsg(state, payload) {
    state.userServerMsg = payload
  },
  setUserErrorMsg(state, payload) {
    state.userErrorMsg = payload
  },

  setImg(state, payload) {
    state.img = payload
  },

  // register
  setRegisterSuccessMsg(state, payload) {
    state.registerSuccessMsg = payload
  },
}
