import { observable, computed } from 'mobx';
import { whenInit, whenReload, reloadAction, injectStore } from '@nimel/directorr';
import { RootStore, RootStoreType, UserRole, selectFromUser, UserModelType } from '@demo/mst-gql';
import { actionShowSuccessSnack } from '@demo/snackbar';
import {
  actionSetUser,
  effectSetUser,
  SetUserPayload,
  actionUserChange,
  actionUserLogin,
  effectUserLogin,
  UserLoginPayload,
  actionEndLoading,
  effectEndLoading,
  actionUserSignup,
  effectUserSignup,
  UserSignupPayload,
  actionUserLogout,
  effectUserLogout,
  actionUserSaveProfile,
  effectUserSaveProfile,
  UserSaveProfilePayload,
} from './decorators';
import i18n from '@demo/i18n';

export const USER_QUERY = selectFromUser().email.name.surname.roles.toString();

export class UserStore {
  @injectStore(RootStore) rootStore: RootStoreType;
  @observable.ref user?: UserModelType;
  @observable isLoadingSaveProfile = false;
  @observable isLoadingLogin = false;
  @observable isLoadingSignup = false;
  @observable isLoadingLogout = false;

  @computed get isLoading() {
    return !this.user;
  }

  @computed get isAnonim() {
    return !!this.user?.roles?.includes(UserRole.ANONIM);
  }

  @computed get isLogin() {
    return !this.isAnonim;
  }

  @whenReload
  @whenInit
  getUser = () => {
    const { data, promise } = this.rootStore.qMe({}, USER_QUERY);

    if (data?.me && !this.isReady) {
      this.whenHaveUser(data);
    }

    promise.tap(this.whenHaveUser);
  };

  @actionSetUser
  whenHaveUser = ({ me }: { me: UserModelType }) => ({ user: me });

  @effectSetUser
  setUser = ({ user }: SetUserPayload) => {
    this.user = user;
  };

  @actionUserChange
  @reloadAction
  whenChangeUser = () => {};

  @actionUserLogin
  login = (email: string, password: string) => ({ email, password });

  @effectUserLogin
  toLogin = ({ email, password }: UserLoginPayload) => {
    this.isLoadingLogin = true;

    const { promise } = this.rootStore.mLogin({ userLoginInput: { email, password } }, USER_QUERY);

    promise.tap(this.whenChangeUser).tap(this.doneLoading).tap(this.showLoginSuccessSnack);
  };

  @actionUserSignup
  signup = (email: string, password: string, name: string, surname?: string) => ({
    email,
    password,
    name,
    surname,
  });

  @effectUserSignup
  toSignup = ({ email, password, name, surname }: UserSignupPayload) => {
    this.isLoadingSignup = true;

    const { promise } = this.rootStore.mSignup(
      { userSignupInput: { email, password, name, surname } },
      USER_QUERY
    );

    promise.tap(this.whenChangeUser).tap(this.doneLoading).tap(this.showSignupSuccessSnack);
  };

  @actionUserLogout
  logout = () => {};

  @effectUserLogout
  toLogout = () => {
    this.isLoadingLogout = true;

    const { promise } = this.rootStore.mLogout({});

    promise.tap(this.whenChangeUser).tap(this.doneLoading).tap(this.showLogoutSuccessSnack);
  };

  @actionUserSaveProfile
  saveProfile = (email: string, name: string, surname?: string) => ({ email, name, surname });

  @effectUserSaveProfile
  toSaveProfile = ({ email, name, surname }: UserSaveProfilePayload) => {
    this.isLoadingSaveProfile = true;

    const { promise } = this.rootStore.mSaveProfile(
      { userInfoInput: { email, name, surname } },
      USER_QUERY
    );

    promise.tap(this.doneLoading).tap(this.showSaveProfileSuccessSnack);
  };

  @actionEndLoading
  doneLoading = () => {};

  @effectEndLoading
  toDoneLoading = () => {
    this.isLoadingLogin = false;
    this.isLoadingSignup = false;
    this.isLoadingLogout = false;
    this.isLoadingSaveProfile = false;
  };

  @actionShowSuccessSnack
  showLoginSuccessSnack = () => ({ message: i18n.login });

  @actionShowSuccessSnack
  showSignupSuccessSnack = () => ({ message: i18n.signup });

  @actionShowSuccessSnack
  showSaveProfileSuccessSnack = () => ({ message: i18n.profileSaved });

  @actionShowSuccessSnack
  showLogoutSuccessSnack = () => ({ message: i18n.logoutSuccess });

  get isReady() {
    return !!this.user;
  }

  toJSON() {}
}
