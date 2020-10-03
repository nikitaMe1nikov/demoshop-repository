import { ComponentType } from 'react';
import { createActionAndEffect } from '@nimel/directorr';

export interface ModalBoxComponentProps {
  open: boolean;
  onClose?: () => void;
  onExited?: () => void;
}

export interface Props {
  [key: string]: any;
}

export interface ModalBoxPayload {
  component: ComponentType<ModalBoxComponentProps>;
  props?: Props;
}

export const [actionOpenModal, effectOpenModal] = createActionAndEffect<ModalBoxPayload>(
  'MODAL.OPEN_ACTION'
);
export const [actionCloseModal, effectCloseModal] = createActionAndEffect<ModalBoxPayload>(
  'MODAL.CLOSE_ACTION'
);
export const [actionDeleteModal, effectDeleteModal] = createActionAndEffect<ModalBoxPayload>(
  'MODAL.DELETE_ACTION'
);
