export const mutations = {
  setAddEmployee(state, payload) {
    state.employees.push({ ...payload });
  },
};
