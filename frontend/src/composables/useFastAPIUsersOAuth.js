// useFastAPIUsersOAuth.js

import axios from "axios";

const useFastAPIUsersOAuth = () => {
  // Function to fetch the OAuth authorization URL from the backend
  const _fetchOAuthAuthorizationUrl = async (backendAuthorizeUrl) => {
    if (!backendAuthorizeUrl) {
      throw new Error("Backend authorize URL is required.");
    }

    try {
      const headers = {
        "ngrok-skip-browser-warning": "any",
      };

      const response = await axios.get(backendAuthorizeUrl, { headers });
      const authUrl = response.data.authorization_url;
      console.debug(`OAuth Provider Authorization URL: ${authUrl}`);
      return authUrl;
    } catch (error) {
      console.error("Failed to fetch Authorization URL:", error);
      throw error;
    }
  };

  // Function to parse OAuth callback parameters from the URL
  const _parseOAuthCallbackParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const state = urlParams.get("state");
    const code = urlParams.get("code");

    if (!state || !code) {
      const error = new Error("Missing state or code in URL parameters");
      console.log(error.message);
      return { state: null, code: null, error };
    }

    console.debug(`state: ${state}\ncode: ${code}`);
    return { state, code, error: null };
  };

  // Function to trigger the backend callback with received state and code
  const _triggerBackendCallback = async (backendCallbackUrl, state, code) => {
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
      console.debug("Access Token:", accessToken);
      return accessToken;
    } catch (error) {
      console.error("Authentication error:", error.message);
    }
  };

  /**
   * Initiates the authentication process by fetching the OAuth authorization URL
   * from the backend and redirecting the user to the obtained URL.
   * @param {string} backendAuthEndpoint - The endpoint for backend authentication.
   * @returns {void} - No return value.
   */
  const authenticate = async (backendAuthEndpoint) => {
    try {
      // Validate input: Ensure backendAuthEndpoint is a non-empty string.
      if (
        typeof backendAuthEndpoint !== "string" ||
        backendAuthEndpoint.trim() === ""
      ) {
        throw new Error(
          "Invalid backendAuthEndpoint. It must be a non-empty string."
        );
      }

      // Fetch OAuth authorization URL from the backend.
      const authUrl = await _fetchOAuthAuthorizationUrl(backendAuthEndpoint);

      // Redirect the user to the obtained authorization URL.
      window.location.href = authUrl;
    } catch (error) {
      console.error("Failed to handle authentication:", error);
      //throw error;
    }
  };

  /**
   * Handles the OAuth callback by parsing parameters and triggering a backend callback.
   * @param {string} backendCallbackEndpoint - The endpoint for the backend callback.
   * @returns {string|null} - The access token if successful, otherwise null.
   */
  const handleOAuthCallback = async (backendCallbackEndpoint) => {
    try {
      // Validate input: Ensure backendCallbackEndpoint is a non-empty string.
      if (
        typeof backendCallbackEndpoint !== "string" ||
        backendCallbackEndpoint.trim() === ""
      ) {
        throw new Error(
          "Invalid backendCallbackEndpoint. It must be a non-empty string."
        );
      }

      const { state, code, error } = _parseOAuthCallbackParams();
      if (error) {
        return null;
      }

      const accessToken = await _triggerBackendCallback(
        backendCallbackEndpoint,
        state,
        code
      );

      return accessToken;
    } catch (error) {
      console.warn("Error during OAuth callback:", error);
      return null;
    }
  };

  return {
    authenticate,
    handleOAuthCallback,
  };
};

export default useFastAPIUsersOAuth;
