import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import {
  BASE_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  SIGNIN_REDIRECT_URL,
  SIGNOUT_REDIRECT_URL,
} from "./env.js";
import { AuthProvider } from "@asgardeo/auth-react";

const root = ReactDOM.createRoot(document.getElementById("root"));

const config = {
  signInRedirectURL: SIGNIN_REDIRECT_URL,
  signOutRedirectURL: SIGNOUT_REDIRECT_URL,
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  baseUrl: BASE_URL,
  scope: ["openid", "profile", "groups", "phone", "email"],
};

root.render(
  <React.StrictMode>
    <AuthProvider config={config}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
