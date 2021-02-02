<template>
  <div id="input" class="w-full py-2">
    <form @submit.prevent="submitChat" class="flex w-full h-full ">
      <input
        type="text"
        :placeholder="[
          isLogin ? 'Anything to say' : 'Login first to start chatting'
        ]"
        class="px-4 py-2 flex-grow rounded-full text-black lg:px-8 lg:py-4"
        v-model="form.chat"
        :disabled="!isLogin"
      />
      <button
        type="submit"
        class="ml-2 px-4 rounded-full bg-green-500 hover:bg-green-400"
        :disabled="!isLogin"
      >
        Send
      </button>
    </form>
  </div>
</template>

<script>
import { computed, reactive } from "vue";
import { useChat } from "../firebase";
import { useStore } from "vuex";

export default {
  setup() {
    const { sendChat } = useChat();
    const store = useStore();
    const currentUser = computed(() => store.state.auth.currentUser);
    const isLogin = computed(() => store.state.auth.isLogin);

    const form = reactive({
      chat: ""
    });
    console.log(currentUser);
    function submitChat() {
      sendChat(currentUser.value.uid, {
        name: currentUser.value.displayName,
        photoURL: currentUser.value.photoURL,
        text: form.chat
      });

      // Reset value after submit
      form.chat = "";
    }

    return { sendChat, form, submitChat, isLogin };
  }
};
</script>

<style></style>
