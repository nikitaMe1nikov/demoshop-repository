import { computed } from 'mobx';
import { effect, injectStore, connectStore, whenInit } from '@nimel/directorr';
import { object, string } from 'yup';
import {
  FormStore,
  actionFormChangeValue,
  actionFormSubmit,
  validate,
  validateAll,
  validatePayload,
  EMPTY_STRING,
} from '@nimel/directorr-form';
import { actionRouterPush } from '@nimel/directorr-router';
import { ROOT_URL } from '@demo/url';
import { UserStore, effectUserChange } from '@demo/user-store';

const VALIDATION_SCHEME = object().shape({
  email: string().email().required(),
  name: string().min(4).required(),
  surname: string().min(4),
});

export class ProfileStore {
  @injectStore(UserStore) userStore: UserStore;

  @connectStore() email = new FormStore();
  @connectStore() name = new FormStore();
  @connectStore() surname = new FormStore();

  @computed get isLoadingSaveProfile() {
    return this.userStore.isLoadingSaveProfile;
  }

  @computed get isLoadingLogout() {
    return this.userStore.isLoadingLogout;
  }

  logout = () => this.userStore.logout();

  saveProfile = () => this.toSaveProfile({});

  @effect([FormStore, actionFormChangeValue.type])
  @validate(VALIDATION_SCHEME)
  changeProfile = () => {};

  @effect([FormStore, actionFormSubmit.type])
  @validateAll(VALIDATION_SCHEME)
  toSaveProfile = ({ validationError }: validatePayload) => {
    if (!validationError)
      this.userStore.saveProfile(this.email.value, this.name.value, this.surname.value);
  };

  @effectUserChange
  @actionRouterPush
  goToDashboard = () => ({ path: ROOT_URL });

  @whenInit
  toInit = () => {
    if (this.userStore.user) {
      const { email, name, surname } = this.userStore.user;

      this.email.value = email || EMPTY_STRING;
      this.name.value = name || EMPTY_STRING;
      this.surname.value = surname || EMPTY_STRING;
    }
  };

  get isReady() {
    return this.email.value === this.userStore.user?.email;
  }
}
