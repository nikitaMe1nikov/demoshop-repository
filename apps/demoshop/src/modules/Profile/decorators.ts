import { createActionAndEffect } from '@nimel/directorr';

interface ErrorPayload {
  message: string;
}

export const [actionLoginSuccess, effectLoginSuccess] = createActionAndEffect('USER.LOGIN_SUCCES');
export const [actionLoginError, effectLoginError] = createActionAndEffect<ErrorPayload>(
  'USER.LOGIN_ERROR'
);
export const [actionSignupSuccess, effectSignupSuccess] = createActionAndEffect(
  'USER.SIGNUP_SUCCES'
);
export const [actionSignupError, effectSignupError] = createActionAndEffect<ErrorPayload>(
  'USER.SIGNUP_ERROR'
);
export const [actionLogoutSuccess, effectLogoutSuccess] = createActionAndEffect(
  'USER.LOGOUT_SUCCES'
);
export const [actionLogoutError, effectLogoutError] = createActionAndEffect('USER.LOGOUT_ERROR');
export const [actionSaveProfileSuccess, effectSaveProfileSuccess] = createActionAndEffect(
  'USER.SAVE_PROFILE_SUCCES'
);
export const [actionSaveProfileError, effectSaveProfileError] = createActionAndEffect(
  'USER.SAVE_PROFILE_ERROR'
);
