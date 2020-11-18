import { Instance } from 'mobx-state-tree';
import { dispatchActionInStore } from '@nimel/directorr';
import Bluebird from 'bluebird';
import { Query, QueryOptions } from 'mst-gql';
import { actionShowErrorSnack } from '@demo/snackbar';
import { RootStoreBase } from './RootStore.base';

export interface RootStoreType extends Instance<typeof RootStore> {}

export interface Variables {
  [key: string]: any;
}

export type FetchPolicy = QueryOptions['fetchPolicy'];

const DEFAULT_OPTION_SNACKBAR = {
  preventDuplicate: true,
};

export const RootStore = RootStoreBase.views((self) => ({
  isReady() {
    return self.__promises.size === 0;
  },
})).actions((self) => ({
  haveError(e: Error) {
    console.log('haveError', e);

    dispatchActionInStore(self, actionShowErrorSnack.type, {
      message: e.message,
      options: DEFAULT_OPTION_SNACKBAR,
    });
  },
  whenChangeUser() {
    self.__queryCache.clear();
  },
  createQueryData<T>({ data, promise }: Query<T>) {
    return {
      data,
      promise: Bluebird.resolve(promise).tapCatch(this.haveError),
    };
  },
  qCategories(...args: Parameters<typeof self.queryCategories>) {
    return this.createQueryData(self.queryCategories(...args));
  },
  qBanners(...args: Parameters<typeof self.queryBanners>) {
    return this.createQueryData(self.queryBanners(...args));
  },
  qCategory(...args: Parameters<typeof self.queryCategory>) {
    return this.createQueryData(self.queryCategory(...args));
  },
  qProducts(...args: Parameters<typeof self.queryProducts>) {
    return this.createQueryData(self.queryProducts(...args));
  },
  qProduct(...args: Parameters<typeof self.queryProduct>) {
    return this.createQueryData(self.queryProduct(...args));
  },
  qFavoritesProducts(...args: Parameters<typeof self.queryFavorites>) {
    return this.createQueryData(self.queryFavorites(...args));
  },
  qCart(...args: Parameters<typeof self.queryCart>) {
    return this.createQueryData(self.queryCart(...args));
  },
  qMe(...args: Parameters<typeof self.queryMe>) {
    return this.createQueryData(self.queryMe(...args));
  },
  qOrders(...args: Parameters<typeof self.queryOrders>) {
    return this.createQueryData(self.queryOrders(...args));
  },
  mAddFavorite(...args: Parameters<typeof self.mutateAddFavorite>) {
    return this.createQueryData(self.mutateAddFavorite(...args));
  },
  mRemoveFavorite(...args: Parameters<typeof self.mutateRemoveFavorite>) {
    return this.createQueryData(self.mutateRemoveFavorite(...args));
  },
  mAddToCart(...args: Parameters<typeof self.mutateAddToCart>) {
    return this.createQueryData(self.mutateAddToCart(...args));
  },
  mRemoveFromCart(...args: Parameters<typeof self.mutateRemoveFromCart>) {
    return this.createQueryData(self.mutateRemoveFromCart(...args));
  },
  mDeleteFromCart(...args: Parameters<typeof self.mutateDeleteFromCart>) {
    return this.createQueryData(self.mutateDeleteFromCart(...args));
  },
  mFillCart(...args: Parameters<typeof self.mutateFillCart>) {
    return this.createQueryData(self.mutateFillCart(...args));
  },
  mLogin(...args: Parameters<typeof self.mutateLogin>) {
    const queryData = this.createQueryData(self.mutateLogin(...args));

    queryData.promise.tap(this.whenChangeUser);

    return queryData;
  },
  mSignup(...args: Parameters<typeof self.mutateSignup>) {
    const queryData = this.createQueryData(self.mutateSignup(...args));

    queryData.promise.tap(this.whenChangeUser);

    return queryData;
  },
  mLogout(...args: Parameters<typeof self.mutateLogout>) {
    const queryData = this.createQueryData(self.mutateLogout(...args));

    queryData.promise.tap(this.whenChangeUser);

    return queryData;
  },
  mSaveProfile(...args: Parameters<typeof self.mutateSaveProfile>) {
    return this.createQueryData(self.mutateSaveProfile(...args));
  },
  sCartChanged(...args: Parameters<typeof self.subscribeCartChanged>) {
    return self.subscribeCartChanged(...args);
  },
}));
