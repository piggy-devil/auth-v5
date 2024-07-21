export const HOME_URL = "/";
export const REGISTER_URL = "/auth/register";
export const LOGIN_URL = "/auth/login";
export const AUTH_ERROR_URL = "/auth/error";
export const AUTH_API_URL = "/api/auth";
export const DEFAULT_LOGIN_REDIRECT: string = "/settings";

export const {
  HOST,
  APPNAME,
  GOOGLE_CLIENT_ID: GOOGLE_ID,
  GOOGLE_CLIENT_SECRET: GOOGLE_SECRET,
  MAIL_USER,
  MAIL_PASSWORD,
  NODE_ENV,
} = process.env;

export const GOOGLE_REDIRECT_URI = `${HOST}${process.env.GOOGLE_REDIRECT_URI}`;
