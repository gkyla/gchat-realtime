<template>
  <div
    class="home h-full w-full overflow-x-hidden dark-light-blue"
    :class="[navIsOpened ? 'opacity-70 ' : '']"
  >
    <div class="container mx-auto">
      <chat-badge
        v-for="chat in allChat"
        :key="chat.tanggal"
        :chat="chat"
      ></chat-badge>

      <div ref="tempView"></div>
    </div>
  </div>

  <div id="panel" class="mt-auto dark-blue p-3">
    <div class="container mx-auto">
      <input-chat></input-chat>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { computed, watch, ref, nextTick } from "vue";
import { useStore } from "vuex";
import inputChat from "../components/InputChat";
import ChatBadge from "../components/ChatBadge.vue";

export default {
  name: "Home",
  components: {
    inputChat,
    ChatBadge
  },
  setup() {
    const store = useStore();
    const tempView = ref(null);
    const allChat = computed(() => store.state.allChat);
    const navIsOpened = computed(() => store.state.navIsOpened);
    const isLogin = computed(() => store.state.auth.isLogin);

    watch(
      allChat,
      () => {
        nextTick(() => {
          tempView.value?.scrollIntoView({ behavior: "smooth" });
        });
      },
      { deep: true }
    );

    return { allChat, navIsOpened, isLogin, tempView };
  }
};
</script>
