import {
  HOME_URL,
  LOGIN_URL,
  REGISTER_URL,
  AUTH_API_URL,
  AUTH_ERROR_URL,
  AUTH_NEW_VERIFICATION,
  RESET_URL,
  AUTH_NEW_PASSWORD,
} from "./lib/config";

/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes: string[] = [HOME_URL, AUTH_NEW_VERIFICATION];

/**
 * An array of routes that are accessible to the public
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes: string[] = [
  LOGIN_URL,
  REGISTER_URL,
  AUTH_ERROR_URL,
  RESET_URL,
  AUTH_NEW_PASSWORD,
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix: string = AUTH_API_URL;

/**
 * The default redirect path after login
 * @type {string}
 */
