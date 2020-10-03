import { computed } from 'mobx';
import {
  action,
  effect,
  injectStore,
  connectStore,
  whenInit,
  DirectorrStoreClass,
} from '@nimel/directorr';
import { object, string } from 'yup';
import { FormStore, FORM_ACTIONS, validate, validateAll } from '@nimel/directorr-form';
import UserStore from 'modules/Profile/UserStore';

const VALIDATION_SCHEME = object().shape({
  email: string().email().required(),
  name: string().min(4).required(),
  surname: string().min(4),
});

export default class ProfileStore implements DirectorrStoreClass {
  @injectStore(UserStore) user: UserStore;

  @connectStore() email = new FormStore();
  @connectStore() name = new FormStore();
  @connectStore() surname = new FormStore();

  @computed get isLoadingSaveProfile() {
    return this.user.isLoadingSaveProfile;
  }

  @computed get isLoadingLogout() {
    return this.user.isLoadingLogout;
  }

  logout = () => this.user.logout();

  @action([FormStore, FORM_ACTIONS.SUBMIT])
  saveProfile = () => {};

  @effect([FormStore, FORM_ACTIONS.CHANGE_VALUE])
  @validate(VALIDATION_SCHEME)
  changeProfile = () => {};

  @effect([FormStore, FORM_ACTIONS.SUBMIT])
  @validateAll(VALIDATION_SCHEME)
  toSaveProfile = ({ validationError }) => {
    if (!validationError)
      this.user.saveProfile(this.email.value, this.name.value, this.surname.value);
  };

  @whenInit
  toInit = () => {
    const { email, name, surname } = this.user.user;

    this.email.value = email;
    this.name.value = name;
    this.surname.value = surname;
  };

  get isReady() {
    return this.email.value === this.user?.user.email;
  }
}
