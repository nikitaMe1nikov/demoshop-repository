import { observable, computed } from 'mobx';
import { effect, injectStore, whenInit, whenPayload } from '@nimel/directorr';
import gql from 'graphql-tag';
import {
  actionGQLSubscription,
  effectGQLSubscriptionSuccess,
  actionDelayAction,
} from 'sagas/decorators';
import i18n from 'config/i18n';
import { GQLPayload } from 'sagas/types';
import UserStore from 'modules/Profile/UserStore';
import { actionSetCart } from 'modules/Cart/decorators';
import { ORDER_FRAGMENT } from 'modules/Cart/CartStore';

const WAIT_VIEWED = 3000;
const WAIT_CUT_LIST = 10000;

const NOTIFICATIONS_QUERY = gql`
  subscription Notifications($userID: String!) {
    cartChanged(userID: $userID) {
      order {
        ...OrderFragment
      }
      date
    }
  }
  ${ORDER_FRAGMENT}
`;

const HIDE_VIEWED = 'NOTIFICATIONS.HIDE_VIEWED';
const CUT_LIST = 'NOTIFICATIONS.CUT_LIST';

interface NotificationData {
  id: string;
  message: string;
  viewed: boolean;
  date: string;
  data?: any;
}

export default class NotificationsStore {
  @observable notifications: NotificationData[] = [];

  @computed get notViewedTotal() {
    return this.notifications.filter((n) => !n.viewed).length;
  }

  @injectStore(UserStore) userStore: UserStore;

  @actionDelayAction
  hideNotifications = () => ({
    wait: WAIT_VIEWED,
    nextAction: {
      type: HIDE_VIEWED,
    },
  });

  @actionDelayAction
  cutList = () => ({
    wait: WAIT_CUT_LIST,
    nextAction: {
      type: CUT_LIST,
    },
  });

  showNotifications = () => {
    this.hideNotifications();
    this.cutList();
  };

  @actionGQLSubscription
  connectNotifications = (userID: string) => ({
    query: NOTIFICATIONS_QUERY,
    variables: { userID },
  });

  @effectGQLSubscriptionSuccess
  @whenPayload({ query: NOTIFICATIONS_QUERY })
  @actionSetCart
  getCartChanged = ({
    data: {
      cartChanged: { date, order },
    },
  }: GQLPayload) => {
    const id = `${Math.random()}`;

    this.notifications.push({ id, message: i18n.cartChanged, viewed: false, date });

    return order;
  };

  @effect(HIDE_VIEWED)
  whenHideViewed = () => {
    this.notifications.forEach((n) => {
      n.viewed = true;
    });
  };

  @effect(CUT_LIST)
  whenCutList = () => {
    const delta = this.notifications.length - 8;

    if (delta > 0) this.notifications.splice(-delta);
  };

  @whenInit
  toInit = () => {
    if (this.userStore.isLogin) this.connectNotifications(this.userStore.user.id);
  };
}
