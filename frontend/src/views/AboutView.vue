<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import useFastAPIUsersOAuth from "@/composables/useFastAPIUsersOAuth.js";

const accessToken = ref("");

// Handle OAuth callback or normal page behavior
const exampleCallbackHandle = async () => {
  try {
    // Check if the state parameter is present in the URL
    const stateParam = new URLSearchParams(window.location.search).get("state");

    if (stateParam) {
      accessToken.value = await useFastAPIUsersOAuth().handleOAuthCallback(
        import.meta.env.VITE_BACKEND_GOOGLE_CALLBACK_URL
      );

      if (accessToken.value) {
        console.log(`%cAccess Token: ${accessToken.value}`, "color: lime");
      }
    } else {
      console.log("Normal about page");
    }
  } catch (error) {
    console.error("Error handling OAuth callback:", error);
  }
};

onMounted(exampleCallbackHandle);
</script>
