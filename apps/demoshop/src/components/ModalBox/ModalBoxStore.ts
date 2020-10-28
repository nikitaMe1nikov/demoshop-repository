import { ComponentType, createElement, ReactElement } from 'react';
import { observable } from 'mobx';
import {
  ModalBoxComponentProps,
  ModalBoxPayload,
  Props,
  effectOpenModal,
  actionCloseModal,
  effectCloseModal,
  actionDeleteModal,
  effectDeleteModal,
} from '@demo/modal-box';

export class ModalBoxStore {
  @observable.shallow modals = new Map<ComponentType<ModalBoxComponentProps>, ReactElement>();

  @effectOpenModal
  toOpen = (payload: ModalBoxPayload) => {
    this.modals.set(
      payload.component,
      createElement(payload.component, {
        ...payload.props,
        key: `${payload.component}`,
        open: true,
        onClose: () => this.close(payload.component, payload.props),
        onExited: () => this.delete(payload.component),
      })
    );
  };

  @actionCloseModal
  close = (component: ComponentType<ModalBoxComponentProps>, props?: Props) => ({
    component,
    props,
  });

  @effectCloseModal
  toClose = (payload: ModalBoxPayload) => {
    this.modals.set(
      payload.component,
      createElement(payload.component, {
        ...payload.props,
        key: `${payload.component}`,
        open: false,
        onExited: () => this.delete(payload.component),
      })
    );
  };

  @actionDeleteModal
  delete = (component: ComponentType<ModalBoxComponentProps>) => ({ component });

  @effectDeleteModal
  toDelete = (payload: ModalBoxPayload) => {
    this.modals.delete(payload.component);
  };
}

export default ModalBoxStore;
