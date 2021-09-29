export const mutations = {
  setTasks(state, payload) {
    state.events = payload;
  },

  setAddTask(state, payload) {
    state.events.push({ ...payload });
  },

  setCRUDButton(state, payload) {
    state.CRUDButton = payload;
  },
};
