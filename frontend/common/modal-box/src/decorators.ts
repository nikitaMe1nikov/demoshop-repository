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

export interface ModalBoxPayload<P = Props> {
  component: ComponentType<ModalBoxComponentProps & P>;
  props?: P;
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
