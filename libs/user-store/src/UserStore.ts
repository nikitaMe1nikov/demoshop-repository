import { observable, computed } from 'mobx';
import { whenInit, whenReload, whenPayload, reloadAction, propOneOf } from '@nimel/directorr';
import gql from 'graphql-tag';
import { actionRouterPush } from '@nimel/directorr-router';
import { User as UserType, UserRole } from '@demo/gql-schema';
import {
  actionGQLQuery,
  effectGQLQuerySuccess,
  effectGQLQueryLoading,
  effectGQLQueryError,
  actionGQLMutation,
  effectGQLMutationSuccess,
  effectGQLMutationLoading,
  effectGQLMutationError,
  actionGQLResetCache,
  effectGQLResetCacheSuccess,
  GQLPayload,
} from '@demo/sagas';
import { actionShowSuccessSnack } from '@demo/snackbar';
import {
  actionLoginSuccess,
  actionLoginError,
  actionSignupSuccess,
  actionSignupError,
  actionLogoutSuccess,
  actionLogoutError,
  actionSaveProfileSuccess,
  actionSaveProfileError,
} from './decorators';
import i18n from '@demo/i18n';

const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    email
    name
    surname
    roles
    favorites {
      id
      name
      price
      favorite
    }
  }
`;

const USER_QUERY = gql`
  query {
    me {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

const LOGIN_MUTATION = gql`
  mutation Login(
    $email: email_String_NotNull_format_email!
    $password: password_String_NotNull_minLength_8!
  ) {
    login(userLoginInput: { email: $email, password: $password }) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

const SIGNUP_MUTATION = gql`
  mutation Signup(
    $email: email_String_NotNull_format_email!
    $password: password_String_NotNull_minLength_8!
    $name: name_String_NotNull_minLength_4_maxLength_40!
    $surname: surname_String_minLength_0_maxLength_40
  ) {
    signup(
      userSignupInput: { email: $email, password: $password, name: $name, surname: $surname }
    ) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`;

const SAVE_PROFILE_MUTATION = gql`
  mutation SaveProfile(
    $email: email_String_NotNull_format_email!
    $name: name_String_NotNull_minLength_4_maxLength_40!
    $surname: surname_String_minLength_0_maxLength_40
  ) {
    saveProfile(userInfoInput: { email: $email, name: $name, surname: $surname }) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

const getError = ({ errors: [error] }: GQLPayload) => ({
  message: error.message,
});

export class UserStore {
  @observable.ref user?: UserType;
  @observable isLoading = true;
  @observable isLoadingLogin = false;
  @observable isLoadingSignup = false;
  @observable isLoadingSaveProfile = false;
  @observable isLoadingLogout = false;

  @computed get isAnonim() {
    return !this.user || this.user.roles.includes(UserRole.ANONIM);
  }

  @computed get isLogin() {
    return !this.isAnonim;
  }

  @whenReload
  @actionGQLQuery
  getUser = () => ({ query: USER_QUERY });

  @actionGQLMutation
  login = (email: string, password: string) => ({
    query: LOGIN_MUTATION,
    variables: { email, password },
  });

  @actionGQLMutation
  signup = (email: string, password: string, name: string, surname?: string) => ({
    query: SIGNUP_MUTATION,
    variables: { email, password, name, surname },
  });

  @actionGQLMutation
  logout = () => ({
    query: LOGOUT_MUTATION,
  });

  @actionGQLMutation
  saveProfile = (email: string, name: string, surname?: string) => ({
    query: SAVE_PROFILE_MUTATION,
    variables: { email, name, surname },
  });

  @effectGQLMutationLoading
  @effectGQLMutationSuccess
  @effectGQLMutationError
  @whenPayload({ query: LOGIN_MUTATION })
  loadingLogin = ({ data, errors }: GQLPayload) => {
    this.isLoadingLogin = !(data || errors);
  };

  @effectGQLMutationLoading
  @effectGQLMutationSuccess
  @effectGQLMutationError
  @whenPayload({ query: SIGNUP_MUTATION })
  loadingSignup = ({ data, errors }: GQLPayload) => {
    this.isLoadingSignup = !(data || errors);
  };

  @effectGQLQueryLoading
  @effectGQLQuerySuccess
  @effectGQLQueryError
  @whenPayload({ query: USER_QUERY })
  loading = ({ data, errors }: GQLPayload) => {
    this.isLoading = !(data || errors);
  };

  @effectGQLQuerySuccess
  @effectGQLMutationSuccess
  @whenPayload({
    query: propOneOf([USER_QUERY, SAVE_PROFILE_MUTATION]),
  })
  setUser = ({ data: { me, saveProfile } }: GQLPayload) => {
    this.user = me || saveProfile;
  };

  @effectGQLMutationLoading
  @effectGQLMutationSuccess
  @effectGQLMutationError
  @whenPayload({ query: LOGOUT_MUTATION })
  loadingLogout = ({ data, errors }: GQLPayload) => {
    this.isLoadingLogout = !(data || errors);
  };

  @effectGQLMutationSuccess
  @whenPayload({ query: LOGOUT_MUTATION })
  @actionLogoutSuccess
  @actionGQLResetCache
  whenLogout = () => {};

  @actionRouterPush
  push = (path: string) => ({
    path,
  });

  @effectGQLMutationError
  @whenPayload({ query: LOGOUT_MUTATION })
  @actionLogoutError
  errorLogout = getError;

  @effectGQLMutationSuccess
  @whenPayload({ query: LOGIN_MUTATION })
  @actionLoginSuccess
  @actionGQLResetCache
  successLogin = () => {};

  @effectGQLMutationSuccess
  @whenPayload({ query: LOGIN_MUTATION })
  @actionShowSuccessSnack
  showLoginSuccessSnack = () => ({ message: i18n.login });

  @effectGQLMutationError
  @whenPayload({ query: LOGIN_MUTATION })
  @actionLoginError
  errorLogin = getError;

  @effectGQLMutationSuccess
  @whenPayload({ query: SIGNUP_MUTATION })
  @actionSignupSuccess
  @actionGQLResetCache
  successSignup = () => {};

  @effectGQLMutationSuccess
  @whenPayload({ query: SIGNUP_MUTATION })
  @actionShowSuccessSnack
  showSignupSuccessSnack = () => ({ message: i18n.signup });

  @effectGQLMutationError
  @whenPayload({ query: SIGNUP_MUTATION })
  @actionSignupError
  errorSignup = getError;

  @effectGQLMutationLoading
  @effectGQLMutationSuccess
  @effectGQLMutationError
  @whenPayload({ query: SAVE_PROFILE_MUTATION })
  loadingSaveProfile = ({ data, errors }: GQLPayload) => {
    this.isLoadingSaveProfile = !(data || errors);
  };

  @effectGQLMutationSuccess
  @whenPayload({ query: SAVE_PROFILE_MUTATION })
  @actionSaveProfileSuccess
  successSaveProfile = () => {};

  @effectGQLMutationSuccess
  @whenPayload({ query: SAVE_PROFILE_MUTATION })
  @actionShowSuccessSnack
  showSaveProfileSuccessSnack = () => ({ message: i18n.profileSaved });

  @effectGQLMutationError
  @whenPayload({ query: SAVE_PROFILE_MUTATION })
  @actionSaveProfileError
  errorSaveProfile = getError;

  @whenInit
  toInit = () => {
    if (!this.isReady) this.getUser();
  };

  get isReady() {
    return !!this.user;
  }

  @effectGQLResetCacheSuccess
  @reloadAction
  toReload = () => {};
}
