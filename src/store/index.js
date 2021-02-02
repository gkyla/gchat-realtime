import { createStore } from "vuex";
import auth from "./auth";

export default createStore({
  state: {
    isReady: false,
    allChats: []
  },
  mutations: {
    snapshotChat(state, docs) {
      state.isReady = false;
      state.allChats = docs;
      state.isReady = true;
    }
  },
  actions: {},
  modules: {
    auth
  }
});
