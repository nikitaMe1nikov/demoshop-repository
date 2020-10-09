import React, { FC, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@nimel/directorr-react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ProductCard, { ProductCardLoading } from '@demoshop/components/Catalog/ProductCard';
import { CatalogStore } from '@demo/catalog-store';
import { UserStore } from '@demo/user-store';
import { useWindowScrollEnd } from '@demoshop/hooks/scroll';
import ProductDetailsModal from '@demoshop/components/Catalog/ProductDetailsModal';

export const ProductsList: FC = () => {
  const {
    products,
    loadMore,
    hasNextPage,
    isLoading,
    productsMap,
    isLoadingFavorites,
    addFavorite,
    removeFavorite,
    showProductDetailsModal,
  } = useStore(CatalogStore);
  const { isLogin } = useStore(UserStore);
  const onOpenModal = useCallback(
    (productID: string) => showProductDetailsModal(productID, ProductDetailsModal),
    [showProductDetailsModal]
  );

  useWindowScrollEnd(loadMore);

  return (
    <Box my={2}>
      <Grid container spacing={2}>
        {isLoading ? (
          <>
            <Grid key="a" item xs={3}>
              <ProductCardLoading />
            </Grid>
            <Grid key="b" item xs={3}>
              <ProductCardLoading />
            </Grid>
            <Grid key="c" item xs={3}>
              <ProductCardLoading />
            </Grid>
            <Grid key="d" item xs={3}>
              <ProductCardLoading />
            </Grid>
          </>
        ) : (
          <>
            {products.map((id) => (
              <Grid key={id} item xs={3}>
                <ProductCard
                  productID={id}
                  productsMap={productsMap}
                  isLoadingFavorites={isLoadingFavorites}
                  addFavorite={addFavorite}
                  removeFavorite={removeFavorite}
                  isLogin={isLogin}
                  onOpenModal={onOpenModal}
                />
              </Grid>
            ))}
            {hasNextPage && (
              <Grid key="0" item xs={3}>
                <ProductCardLoading />
              </Grid>
            )}
          </>
        )}
      </Grid>
    </Box>
  );
};

export default observer(ProductsList);
