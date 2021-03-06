import { computed } from 'mobx';
import { effect, injectStore, connectStore, EMPTY_OBJECT } from '@nimel/directorr';
import { object, string } from 'yup';
import {
  FormStore,
  actionFormChangeValue,
  actionFormSubmit,
  validate,
  validateAll,
  validatePayload,
} from '@nimel/directorr-form';
import { UserStore } from '@frontend/user-store';

const VALIDATION_SCHEME = object().shape({
  login: string().email().required(),
  password: string().min(8).required(),
});

export class LoginFormStore {
  @injectStore(UserStore) userStore: UserStore;

  @connectStore() login = new FormStore();
  @connectStore() password = new FormStore();

  @computed get isLoading() {
    return this.userStore.isLoadingLogin;
  }

  submitButton = () => {
    this.submitLogin(EMPTY_OBJECT);
  };

  @effect([FormStore, actionFormChangeValue.type])
  @validate(VALIDATION_SCHEME)
  changeLogin = () => {};

  @effect([FormStore, actionFormSubmit.type])
  @validateAll(VALIDATION_SCHEME)
  submitLogin = ({ validationError }: validatePayload) => {
    if (!validationError) {
      this.userStore.login(this.login.value, this.password.value);
    }
  };
}
