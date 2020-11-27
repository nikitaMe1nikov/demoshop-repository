import { Instance } from 'mobx-state-tree';
import { actionShowInfoSnack } from '@frontend/snackbar';
import { dispatchActionInStore } from '@nimel/directorr';
import i18n from '@frontend/i18n';
import { CHANGE_CART_QUERY } from './OrderModel';
import { ProductModelBase, selectFromProduct } from './ProductModel.base';

/* The TypeScript type of an instance of ProductModel */
export interface ProductModelType extends Instance<typeof ProductModel.Type> {}

/* A graphql query fragment builders for ProductModel */
export {
  selectFromProduct,
  productModelPrimitives,
  ProductModelSelector,
} from './ProductModel.base';

const PRODUCT_FAVORITE_QUERY = selectFromProduct().favorite.toString();

/**
 * ProductModel
 */
export const ProductModel = ProductModelBase.volatile(() => ({
  isLoadingFavorite: false,
  isLoadingAmount: false,
  isLoadingDelete: false,
})).actions((self) => ({
  toggleFavorite() {
    self.isLoadingFavorite = true;

    if (self.favorite) {
      self.store
        .mRemoveFavorite({ id: self.id }, PRODUCT_FAVORITE_QUERY)
        .promise.finally(this.doneLoading);
    } else {
      self.store
        .mAddFavorite({ id: self.id }, PRODUCT_FAVORITE_QUERY)
        .promise.finally(this.doneLoading);
    }
  },
  doneLoading() {
    self.isLoadingFavorite = false;
    self.isLoadingAmount = false;
    self.isLoadingDelete = false;
  },
  addToCart() {
    self.isLoadingAmount = true;

    self.store
      .mAddToCart({ productId: self.id }, CHANGE_CART_QUERY)
      .promise.tap(this.addToCartSuccess)
      .finally(this.doneLoading);
  },
  addToCartSuccess() {
    dispatchActionInStore(self.store, actionShowInfoSnack.type, {
      message: i18n.productAddedInCart,
    });
  },
  removeFromCart() {
    self.isLoadingAmount = true;

    self.store
      .mRemoveFromCart({ productId: self.id }, CHANGE_CART_QUERY)
      .promise.tap(this.removeFromCartSuccess)
      .finally(this.doneLoading);
  },
  removeFromCartSuccess() {
    dispatchActionInStore(self.store, actionShowInfoSnack.type, {
      message: i18n.productRemovedFromCart,
    });
  },
  deleteFromCart() {
    self.isLoadingDelete = true;

    self.store
      .mDeleteFromCart({ productId: self.id }, CHANGE_CART_QUERY)
      .promise.tap(this.deleteFromCartSuccess)
      .finally(this.doneLoading);
  },
  deleteFromCartSuccess() {
    dispatchActionInStore(self.store, actionShowInfoSnack.type, {
      message: i18n.productDeletedFromCart,
    });
  },
}));
