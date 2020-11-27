import { createActionAndEffect } from '@nimel/directorr';
import { BannerModelType } from '@frontend/gql';

export interface BannersPayload {
  banners: BannerModelType[];
}

export const [actionSetBanners, effectSetBanners] = createActionAndEffect<BannersPayload>(
  'DashboardStore.setBanners'
);
