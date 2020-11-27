import { Instance } from 'mobx-state-tree';
import { BannerModelBase } from './BannerModel.base';

/* The TypeScript type of an instance of BannerModel */
export type BannerModelType = Instance<typeof BannerModel>;

/* A graphql query fragment builders for BannerModel */
export { selectFromBanner, bannerModelPrimitives, BannerModelSelector } from './BannerModel.base';

/**
 * BannerModel
 */
export const BannerModel = BannerModelBase;
