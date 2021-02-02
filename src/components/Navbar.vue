<template>
  <div id="nav" class="w-full flex items-center dark-blue">
    <div class="container mx-auto h-20 flex items-center px-3">
      <div class="info">
        <h1 class="text-xl">GkyChat - Realtime</h1>
      </div>
      <div
        class="flex flex-col h-screen w-full sm:w-80 absolute offscreen dark-black z-50 pl-5"
        :class="[navIsOpened ? 'opened' : '']"
      >
        <div id="content" v-if="isLogin">
          <h1 class="text-2xl mt-4">User Info</h1>
          <div
            id="badge"
            v-if="isLogin"
            class="flex items-center p-2 text-white "
          >
            <img
              :src="currentUser.photoURL"
              :alt="`${currentUser.displayName} profile`"
              class="rounded-full border-white w-auto"
            />
            <h1 class="text-xl ml-2">{{ currentUser.displayName }}</h1>
          </div>
          <p class="py-4 text-xl">Email : {{ currentUser.email }}</p>
          <p class="py-4 text-xl">
            Phone Number : {{ currentUser.phoneNumber || "-" }}
          </p>
        </div>
        <div v-else>
          <h1 class="text-2xl text-center p-4">Login to see profile</h1>
        </div>
      </div>
      <div id="logo" class="text-white ml-auto flex">
        <button
          @click="toggleNav"
          class="px-4 py-2  mr-4 rounded-md  z-50"
          :class="[
            navIsOpened
              ? 'opened absolute top-2 right-0 sm:static bg-red-500'
              : 'dark-light-blue'
          ]"
        >
          {{ navIsOpened ? "Close" : "Open" }} Profile
        </button>
        <button
          @click="loginUser"
          class="px-4 py-2 bg-green-600 rounded-md"
          v-if="!isLogin"
        >
          Login
        </button>
        <button
          @click="logoutUser"
          v-if="isLogin"
          class="px-4 py-2 bg-green-600 rounded-md"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useAuth } from "../firebase";

export default {
  setup() {
    const store = useStore();
    const { loginUser, logoutUser } = useAuth();
    const isLogin = computed(() => store.state.auth.isLogin);
    const currentUser = computed(() => store.state.auth.currentUser);
    const navIsOpened = ref(false);

    function toggleNav() {
      navIsOpened.value = !navIsOpened.value;
      store.commit("setNavStatus", navIsOpened.value);
    }

    return {
      loginUser,
      isLogin,
      logoutUser,
      currentUser,
      toggleNav,
      navIsOpened
    };
  }
};
</script>

<style>
.offscreen {
  top: 0;
  left: -100%;
}

.offscreen.opened {
  left: 0%;
}
</style>
