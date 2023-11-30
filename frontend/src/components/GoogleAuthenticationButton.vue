<!-- GoogleAuthenticationButton.vue -->

<template>
  <button @click="authenticate">
    <img src="@/assets/google.png" alt="Google Logo" width="20" height="20" />
    Login with Google
  </button>
</template>

<script setup>
import { onMounted } from "vue";
import useFastAPIUsersOAuth from "@/composables/useFastAPIUsersOAuth.js";

const props = defineProps({
  backendAuthEndpoint: {
    type: String,
    required: true,
  },
});

const { authUrl, fetchAuthUrlFromBackend } = useFastAPIUsersOAuth();

const authenticate = () => {
  window.location.href = authUrl.value;
};
onMounted(async () => {
  await fetchAuthUrlFromBackend(props.backendAuthEndpoint);
});
</script>

<style>
button {
  margin-top: 20px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

img {
  margin-right: 10px;
}
</style>
