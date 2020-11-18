import { createActionAndEffect } from '@nimel/directorr';

export const [actionHideViewed, effectHideViewed] = createActionAndEffect<void>(
  'NotificationsStore.HIDE_VIEWED'
);
export const [actionCutList, effectCutList] = createActionAndEffect<void>(
  'NotificationsStore.CUT_LIST'
);
