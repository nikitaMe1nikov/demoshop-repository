import { Instance } from 'mobx-state-tree';
import { UserModelBase } from './UserModel.base';

/* The TypeScript type of an instance of UserModel */
export interface UserModelType extends Instance<typeof UserModel.Type> {}

/* A graphql query fragment builders for UserModel */
export { selectFromUser, userModelPrimitives, UserModelSelector } from './UserModel.base';

// export const USER_QUERY = selectFromUser()
//   .email.name.surname.roles.favorites((product) => product.price.name.favorite)
//   .toString();

/**
 * UserModel
 */
export const UserModel = UserModelBase.actions((self) => ({
  // whenChangeUser() {
  //   self.store.__runInStoreContext(() => self.store.__queryCache.clear());
  // },
  // login(email: string, password: string) {
  //   self.isLoadingLogin = true;
  //   return self.store
  //     .mLogin({ userLoginInput: { email, password } }, USER_QUERY)
  //     .finally(this.doneLoading);
  // },
  // signup(email: string, password: string, name: string, surname?: string) {
  //   self.isLoadingSignup = true;
  //   return self.store
  //     .mSignup({ userSignupInput: { email, password, name, surname } }, USER_QUERY)
  //     .finally(this.doneLoading);
  // },
  // logout() {
  //   self.isLoadingLogout = true;
  //   return self.store.mLogout({}).finally(this.doneLoading);
  // },
  // saveProfile(email: string, name: string, surname?: string) {
  //   self.isLoadingSaveProfile = true;
  //   return self.store
  //     .mSaveProfile({ userInfoInput: { email, name, surname } }, USER_QUERY)
  //     .finally(this.doneLoading);
  // },
  // doneLoading() {
  //   self.isLoadingLogin = false;
  //   self.isLoadingSignup = false;
  //   self.isLoadingLogout = false;
  //   self.isLoadingSaveProfile = false;
  // },
}));
