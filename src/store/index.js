import { createStore } from "vuex";
import auth from "./auth";

export default createStore({
  state: {
    navIsOpened: false,
    isReady: false,
    allChat: []
  },
  mutations: {
    snapshotChat(state, docs) {
      state.isReady = false;
      state.allChat = docs;
      state.isReady = true;
    },
    setNavStatus(state, value) {
      console.log(value);
      state.navIsOpened = value;
    }
  },
  actions: {},
  modules: {
    auth
  }
});
