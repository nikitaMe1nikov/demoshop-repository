import { createActionAndEffect } from '@nimel/directorr';
import { BannerModelType } from '@demo/mst-gql';

export interface BannersPayload {
  banners: BannerModelType[];
}

export const [actionSetBanners, effectSetBanners] = createActionAndEffect<BannersPayload>(
  'DashboardStore.setBanners'
);
