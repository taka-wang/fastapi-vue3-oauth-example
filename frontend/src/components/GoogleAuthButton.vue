<!-- GoogleAuthButton.vue -->

<template>
  <button @click="authenticate(backendAuthEndpoint)">
    <img src="@/assets/google.png" alt="Google Logo" width="20" height="20" />
    Login with Google
  </button>
</template>

<script setup>
import { defineProps } from "vue";
import useFastAPIUsersOAuth from "@/composables/useFastAPIUsersOAuth.js";

const { authenticate } = useFastAPIUsersOAuth();

const props = defineProps({
  backendAuthEndpoint: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
button {
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  font-size: 16px;
  margin-top: 20px;
  padding: 10px;
}
</style>
