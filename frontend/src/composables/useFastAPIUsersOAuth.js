// useFastAPIUsersOAuth.js

import { ref } from "vue";
import axios from "axios";

const useFastAPIUsersOAuth = () => {
  const authUrl = ref("");

  const fetchAuthUrlFromBackend = async (backendAuthorizeUrl) => {
    if (!backendAuthorizeUrl) {
      throw new Error("Backend authorize URL is required.");
    }

    try {
      const headers = {
        "ngrok-skip-browser-warning": "any",
      };

      const response = await axios.get(backendAuthorizeUrl, { headers });

      authUrl.value = response.data.authorization_url;
      console.log(`OAuth Provider Authorization URL: ${authUrl.value}`);
    } catch (error) {
      console.error("Error fetching Authorization URL:", error);
      throw error;
    }
  };

  const parseCallbackParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const state = urlParams.get("state");
    const code = urlParams.get("code");

    if (!state || !code) {
      const error = new Error("Missing state or code in URL parameters");
      console.debug(error.message);
      return { state: null, code: null, error };
    }

    console.log(`state: ${state}\ncode: ${code}`);
    return { state, code, error: null };
  };

  const triggerBackendCallback = async (backendCallbackUrl, state, code) => {
    try {
      const response = await axios.get(backendCallbackUrl, {
        params: {
          code,
          state,
        },
        headers: {
          "ngrok-skip-browser-warning": "any",
          accept: "application/json",
        },
      });

      const accessToken = response.data.access_token;
      // console.log("Access Token:", accessToken);
      return accessToken;
    } catch (error) {
      console.error("Authentication error:", error.message);
    }
  };

  return {
    authUrl,
    fetchAuthUrlFromBackend,
    parseCallbackParams,
    triggerBackendCallback,
  };
};

export default useFastAPIUsersOAuth;
