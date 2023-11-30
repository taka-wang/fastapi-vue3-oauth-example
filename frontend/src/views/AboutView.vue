<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import useFastAPIUsersOAuth from "@/composables/useFastAPIUsersOAuth.js";

const { parseCallbackParams, triggerBackendCallback } = useFastAPIUsersOAuth();
const backendCallbackEndpoint = import.meta.env
  .VITE_BACKEND_GOOGLE_CALLBACK_URL;

const handleOAuthCallback = async () => {
  try {
    const { state, code, error } = await parseCallbackParams();

    if (error) {
      console.log("Normal about page, do nothing...");
      return;
    }

    const accessToken = await triggerBackendCallback(
      backendCallbackEndpoint,
      state,
      code
    );
    console.log(`%cAccess Token: ${accessToken}`, "color: lime");
  } catch (error) {
    console.warn("Error during OAuth callback:", error);
  }
};

onMounted(handleOAuthCallback);
</script>
