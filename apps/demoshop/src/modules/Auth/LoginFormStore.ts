import { computed } from 'mobx';
import { action, effect, injectStore, connectStore } from '@nimel/directorr';
import { object, string } from 'yup';
import { FormStore, FORM_ACTIONS, validate, validateAll } from '@nimel/directorr-form';
import UserStore from 'modules/Profile/UserStore';

const VALIDATION_SCHEME = object().shape({
  login: string().email().required(),
  password: string().min(8).required(),
});

export default class LoginFormStore {
  @injectStore(UserStore) user: UserStore;

  @connectStore() login = new FormStore();
  @connectStore() password = new FormStore();

  @computed get isLoading() {
    return this.user.isLoading;
  }

  @action([FormStore, FORM_ACTIONS.SUBMIT])
  submitButton = () => {};

  @effect([FormStore, FORM_ACTIONS.CHANGE_VALUE])
  @validate(VALIDATION_SCHEME)
  changeLogin = () => {};

  @effect([FormStore, FORM_ACTIONS.SUBMIT])
  @validateAll(VALIDATION_SCHEME)
  submitLogin = ({ validationError }) => {
    if (!validationError) {
      this.user.login(this.login.value, this.password.value);
    }
  };
}
