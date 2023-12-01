<template>
  <div class="main">
    <h1>This is the main page</h1>
    <GoogleAuthButton :backendAuthEndpoint="authUrl" />
  </div>
</template>

<script setup>
import GoogleAuthButton from "@/components/GoogleAuthButton.vue";
const authUrl = import.meta.env.VITE_BACKEND_GOOGLE_AUTH_URL;
</script>

<style>
@media (min-width: 1024px) {
  .main {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

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
}
</style>
