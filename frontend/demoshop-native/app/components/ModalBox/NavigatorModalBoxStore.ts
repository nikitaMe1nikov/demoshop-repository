import { ComponentType, createElement } from 'react';
import { observable } from 'mobx';
import { delay } from '@nimel/directorr';
import {
  actionRouterBack,
  actionRouterNavigate,
  effectHistoryPush,
  HistoryActionPayload,
} from 'components/NavigationRouter/decorators';
import { ModalBoxPayload, effectOpenModal } from '@frontend/modal-box';

function getName(Component: ComponentType<any>) {
  return `${Component.name || Component.displayName}-${Math.random()}`;
}

export class NavigatorModalBoxStore {
  @observable.shallow modals = new Map<string, ComponentType>();

  @effectOpenModal
  toOpen = (payload: ModalBoxPayload) => {
    const routeName = getName(payload.component);

    this.modals.set(routeName, () =>
      createElement(payload.component, {
        ...payload?.props,
        open: true,
        onClose: this.goBack,
      })
    );

    this.goToModal(routeName);
  };

  @effectHistoryPush
  whenPush = ({ pattern }: HistoryActionPayload) => {
    if (pattern) this.modals.clear();
  };

  @actionRouterBack
  goBack = () => {};

  @delay()
  @actionRouterNavigate
  goToModal = (routeName: string) => ({
    routeName,
  });
}
