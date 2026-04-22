/**
 * Authentication utilities for OAuth integration
 */

import { UserAPI } from "../api/User";
import { backendDataSource } from "./Config";

export const isAuthenticated = async (): Promise<any> => {
    // Check for an active backend session to OAuth provider
    const user = await UserAPI.fetch()
    if(user) localStorage.setItem("microstore_user", JSON.stringify(user))
    return user;
};

export const currentUser = (): any => {
  const maybeUser = localStorage.getItem("microstore_user")
  if (!maybeUser) return null
  return JSON.parse(maybeUser)
}

export const login = async (): Promise<any> => {
  // Check for auth, give it back if present
  const user = await isAuthenticated()
  if (user) return user;

  // Not logged in? Try to redirect into the funnel
  let redirector = () => {
      window.location.href = backendDataSource() + '/auth/login';
  };
  setTimeout(redirector, 100);
  return null
};

export const logout = async (): Promise<void> => {
  localStorage.removeItem("microstore_user");
  UserAPI.logout();
};