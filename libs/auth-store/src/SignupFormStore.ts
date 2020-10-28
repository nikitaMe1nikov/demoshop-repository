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
import { UserStore, effectSignupError } from '@demo/user-store';
import { actionShowSnack } from '@demo/snackbar';

const VALIDATION_SCHEME = object().shape({
  email: string().email().required(),
  name: string().min(4).required(),
  password: string().min(8).required(),
  checkPassword: string()
    .min(8)
    .required()
    .test({
      message: ({ path }) => `${path} must be equal`,
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
    return this.user.isLoadingSignup;
  }

  submitButton = () => {
    this.submitSignup(EMPTY_OBJECT);
  };

  @effect([FormStore, actionFormChangeValue.type])
  @validate(VALIDATION_SCHEME)
  changeLogin = () => {};

  @effect([FormStore, actionFormSubmit.type])
  @validateAll(VALIDATION_SCHEME)
  submitSignup = ({ validationError }: validatePayload) => {
    if (!validationError) {
      this.user.signup(this.email.value, this.password.value, this.name.value);
    }
  };

  @effectSignupError
  @actionShowSnack
  whenErrorSign = ({ message }) => ({ message });
}
