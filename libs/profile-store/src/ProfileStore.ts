import { computed } from 'mobx';
import { effect, injectStore, connectStore, whenInit, DirectorrStoreClass } from '@nimel/directorr';
import { object, string } from 'yup';
import {
  FormStore,
  actionFormChangeValue,
  actionFormSubmit,
  validate,
  validateAll,
  validatePayload,
} from '@nimel/directorr-form';
import { UserStore } from '@demo/user-store';

const VALIDATION_SCHEME = object().shape({
  email: string().email().required(),
  name: string().min(4).required(),
  surname: string().min(4),
});

export class ProfileStore implements DirectorrStoreClass {
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

  saveProfile = () => {
    this.toSaveProfile({});
  };

  @effect([FormStore, actionFormChangeValue.type])
  @validate(VALIDATION_SCHEME)
  changeProfile = () => {};

  @effect([FormStore, actionFormSubmit.type])
  @validateAll(VALIDATION_SCHEME)
  toSaveProfile = ({ validationError }: validatePayload) => {
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
