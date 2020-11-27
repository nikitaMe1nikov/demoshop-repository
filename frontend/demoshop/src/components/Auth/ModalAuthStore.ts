import { actionOpenModal, actionCloseModal } from '@frontend/modal-box';
import { effectUserChange } from '@frontend/user-store';
import ModalAuth from 'components/Auth';

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
