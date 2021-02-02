const auth = {
  namespace: true,
  state: {
    loading: null,
    isLogin: null,
    currentUser: null
  },
  mutations: {
    stateChange(state, user) {
      state.loading = true;

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
