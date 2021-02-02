const auth = {
  namespaced: true,
  state: {
    loading: null,
    isLogin: null,
    currentUser: null
  },
  mutations: {
    stateChange(state, user) {
      state.loading = true;
      state.currentUser = user;
      if (user) {
        state.isLogin = true;
      } else {
        state.isLogin = false;
      }

      state.loading = false;
    }
  },
  actions: {},
  modules: {}
};

export default auth;
