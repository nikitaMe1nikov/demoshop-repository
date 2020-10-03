import { actionOpenModal, actionCloseModal } from 'modules/ModalBox/decorators';
import { effectLoginSuccess, effectSignupSuccess } from 'modules/Profile/decorators';
import ModalAuth from 'modules/Auth';

export default class ModalAuthStore {
  @actionOpenModal
  showForm = () => ({
    component: ModalAuth,
  });

  @effectLoginSuccess
  @effectSignupSuccess
  @actionCloseModal
  whenLoginSuccess = () => ({
    component: ModalAuth,
  });
}
