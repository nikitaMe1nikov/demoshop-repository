import { actionOpenModal, actionCloseModal } from '@demo/modal-box';
import { effectUserChange } from '@demo/user-store';
import ModalAuth from '@demoshop/components/Auth';

export default class ModalAuthStore {
  @actionOpenModal
  showForm = () => ({
    component: ModalAuth,
  });

  @effectUserChange
  @actionCloseModal
  whenLoginSuccess = () => ({
    component: ModalAuth,
  });
}
