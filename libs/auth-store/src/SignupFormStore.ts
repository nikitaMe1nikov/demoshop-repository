import { computed } from 'mobx';
import { action, effect, injectStore, connectStore } from '@nimel/directorr';
import { object, string } from 'yup';
import { FormStore, FORM_ACTIONS, validate, validateAll } from '@nimel/directorr-form';
import { UserStore, effectSignupError } from '@demo/user-store';
import { actionShowSnack } from '@demo/snackbar-store';

const VALIDATION_SCHEME = object().shape({
  email: string().email().required(),
  name: string().min(4).required(),
  password: string().min(8).required(),
  checkPassword: string()
    .min(8)
    .required()
    .test({
      name: 'equal',
      message: 'must be equal',
      test: function (value) {
        return !this.parent.password || this.parent.password === value;
      },
    }),
});

export class SignupFormStore {
  @injectStore(UserStore) user: UserStore;

  @connectStore() email = new FormStore();
  @connectStore() name = new FormStore();
  @connectStore() password = new FormStore();
  @connectStore() checkPassword = new FormStore();

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
      this.user.signup(this.email.value, this.password.value, this.name.value);
    }
  };

  @effectSignupError
  @actionShowSnack
  whenErrorSign = ({ message }) => ({ message });
}
