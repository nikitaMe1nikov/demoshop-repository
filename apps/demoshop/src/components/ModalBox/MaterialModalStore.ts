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

export class MaterialModalStore {
  @observable.shallow modals = new Map<ComponentType<ModalBoxComponentProps>, ReactElement>();

  @effectOpenModal
  toOpen = ({ component, props }: ModalBoxPayload) => {
    this.modals.set(
      component,
      createElement(component, {
        ...props,
        key: `${component}`,
        open: true,
        onClose: () => this.close(component, props),
        onExited: () => this.delete(component),
      })
    );
  };

  @actionCloseModal
  close = (component: ComponentType<ModalBoxComponentProps>, props?: Props) => ({
    component,
    props,
  });

  @effectCloseModal
  toClose = ({ component, props }: ModalBoxPayload) => {
    this.modals.set(
      component,
      createElement(component, {
        ...props,
        key: `${component}`,
        open: false,
        onExited: () => this.delete(component),
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

export default MaterialModalStore;
