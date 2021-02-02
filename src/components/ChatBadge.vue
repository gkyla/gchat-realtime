<template>
  <div id="chat-badge" class="w-full">
    <div class="flex flex-col my-4 mx-2 w-full pr-5">
      <div
        class="text-sm my-1 opacity-60"
        :class="[senderChat ? 'text-right' : '']"
      >
        <p id="name" class="mx-3">{{ chat.name }}</p>
      </div>
      <div class="flex " :class="[senderChat ? 'flex-row-reverse' : '']">
        <img
          :src="chat.photoURL"
          :alt="`${chat.name} Picture`"
          class="rounded-full h-10 mx-3"
        />
        <div
          id="chat-box"
          class="q p-3 rounded-xl"
          :class="[senderChat ? 'bg-green-800' : 'dark-blue']"
        >
          <p>{{ chat.text }}</p>
          <span class="opacity-50 text-sm ml-auto w-full">{{ chat.date }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  props: {
    chat: Object
  },
  setup(props) {
    const store = useStore();
    const currentUser = computed(() => store.state.auth.currentUser);
    const isLogin = computed(() => store.state.auth.isLogin);
    const senderChat = computed(() => {
      if (isLogin.value) {
        return props.chat.userUid === currentUser.value.uid;
      } else {
        return false;
      }
    });

    return {
      senderChat
    };
  }
};
</script>

<style>
.q {
  white-space: normal;
  word-wrap: break-word;
  word-break: break-all;
}
</style>
