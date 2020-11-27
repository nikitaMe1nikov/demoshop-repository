import { observable, computed } from 'mobx';
import { injectStore, whenInit, delay } from '@nimel/directorr';
import {
  RootStore,
  RootStoreType,
  selectFromCartChangedEvent,
  CHANGE_CART_QUERY,
  CartChangedEventModelType,
} from '@frontend/gql';
import i18n from '@frontend/i18n';
import { UserStore } from '@frontend/user-store';
import { actionSetCart } from '@frontend/cart-store';
import { actionHideViewed, effectHideViewed, actionCutList, effectCutList } from './decorators';

const WAIT_VIEWED = 3000;
const WAIT_CUT_LIST = 10000;

const SUB_TO_CHANGE_CART_QUERY = selectFromCartChangedEvent()
  .date.order(CHANGE_CART_QUERY)
  .toString();

interface NotificationData {
  id: string;
  message: string;
  viewed: boolean;
  date: string;
  data?: any;
}

export class NotificationsStore {
  @injectStore(RootStore) rootStore: RootStoreType;

  @observable notifications: NotificationData[] = [];

  @computed get notViewedTotal() {
    return this.notifications.filter((n) => !n.viewed).length;
  }

  @injectStore(UserStore) userStore: UserStore;

  @delay(WAIT_VIEWED)
  @actionHideViewed
  hideNotifications = () => {};

  @delay(WAIT_CUT_LIST)
  @actionCutList
  cutList = () => {};

  showNotifications = () => {
    this.hideNotifications();
    this.cutList();
  };

  @actionSetCart
  getCartChanged = ({ date, order: cart }: CartChangedEventModelType) => {
    const id = `${Math.random()}`;

    this.notifications.push({ id, message: i18n.cartChanged, viewed: false, date });

    return { cart };
  };

  @effectHideViewed
  whenHideViewed = () => {
    this.notifications.forEach((n) => {
      n.viewed = true;
    });
  };

  @effectCutList
  whenCutList = () => {
    const delta = this.notifications.length - 8;

    if (delta > 0) this.notifications.splice(-delta);
  };

  @whenInit
  toInit = () => {
    if (this.userStore.isLogin && this.userStore.user)
      this.rootStore.sCartChanged(
        { userId: this.userStore.user.id },
        SUB_TO_CHANGE_CART_QUERY,
        this.getCartChanged
      );
  };
}
