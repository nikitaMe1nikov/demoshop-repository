import { observable, computed } from 'mobx';
import { whenInit, whenReload, DirectorrStoreClass, injectStore } from '@nimel/directorr';
import { historyChange, HistoryChangeActionPayload } from '@nimel/directorr-router';
import { ROOT_URL } from '@frontend/url';
import { RootStore, RootStoreType, BannerModelType, selectFromBanner } from '@frontend/gql';
import { actionSetBanners, effectSetBanners, BannersPayload } from './decorators';

const BANNERS_QUERY = selectFromBanner()
  .name.description.images((image) => image.big.medium.small)
  .toString();

export class DashboardStore implements DirectorrStoreClass {
  @injectStore(RootStore) rootStore: RootStoreType;
  @observable.ref banners?: BannerModelType[];

  @computed get isLoading() {
    return !this.banners;
  }

  @whenReload
  @whenInit
  getBanners = () => {
    const { data, promise } = this.rootStore.qBanners({}, BANNERS_QUERY);

    if (data?.banners) {
      this.whenHaveBanners(data);
    }

    promise.tap(this.whenHaveBanners);
  };

  @actionSetBanners
  whenHaveBanners = ({ banners }: BannersPayload) => ({ banners });

  @effectSetBanners
  setBanners = ({ banners }: BannersPayload) => {
    this.banners = banners;
  };

  @historyChange(ROOT_URL)
  toRouteChange = ({ match }: HistoryChangeActionPayload) => {
    if (match && this.isReady) this.getBanners();
  };

  get isReady() {
    return !!this.banners;
  }
}
