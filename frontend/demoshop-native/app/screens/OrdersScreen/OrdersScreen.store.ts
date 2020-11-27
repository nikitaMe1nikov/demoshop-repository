import { actionRouterPush } from '@nimel/directorr-router';
import { USER_URL } from '@frontend/url';

export default class OrdersScreenStore {
  @actionRouterPush
  pushToProfile = () => ({
    path: USER_URL,
  });
}
