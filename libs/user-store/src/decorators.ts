import { createActionAndEffect } from '@nimel/directorr';
import { UserModelType } from '@demo/mst-gql';

export interface SetUserPayload {
  user: UserModelType;
}

export interface UserLoginPayload {
  email: string;
  password: string;
}

export interface UserSignupPayload {
  email: string;
  password: string;
  name: string;
  surname?: string;
}

export interface UserSaveProfilePayload {
  email: string;
  name: string;
  surname?: string;
}

export const [actionUserChange, effectUserChange] = createActionAndEffect<void>('UserStore.CHANGE');
export const [actionUserLogin, effectUserLogin] = createActionAndEffect<UserLoginPayload>(
  'UserStore.LOGIN'
);
export const [actionUserSignup, effectUserSignup] = createActionAndEffect<UserSignupPayload>(
  'UserStore.SIGNUP'
);
export const [actionUserLogout, effectUserLogout] = createActionAndEffect<void>('UserStore.LOGOUT');
export const [actionUserSaveProfile, effectUserSaveProfile] = createActionAndEffect<
  UserSaveProfilePayload
>('UserStore.SAVE_PROFILE');
export const [actionEndLoading, effectEndLoading] = createActionAndEffect<void>(
  'UserStore.END_LOADING'
);
export const [actionSetUser, effectSetUser] = createActionAndEffect<SetUserPayload>(
  'UserStore.SER_USER'
);
