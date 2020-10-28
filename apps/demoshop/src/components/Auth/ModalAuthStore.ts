import { actionOpenModal, actionCloseModal } from '@demo/modal-box';
import { effectLoginSuccess, effectSignupSuccess } from '@demo/user-store';
import ModalAuth from '@demoshop/components/Auth';

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
