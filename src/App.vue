<template>
  <div id="wrapper" class="flex flex-col h-screen max-h-screen w-screen">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import { realtimeListener } from "./firebase";

export default {
  setup() {
    realtimeListener();
  },
  components: {
    Navbar
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap");

body,
html {
  min-height: 100vh;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: "Roboto Condensed", sans-serif;
  min-height: 100vh;
  color: white;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
