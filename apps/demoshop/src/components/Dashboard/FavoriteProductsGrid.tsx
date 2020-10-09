import React from 'react';
import { observer } from 'mobx-react-lite';
import Box from '@material-ui/core/Box';
import { useStore } from '@nimel/directorr-react';
import { DirectorrNextComponent } from '@nimel/directorr-next';
import Grid from '@material-ui/core/Grid';
import ProductCard from '@demoshop/components/Catalog/ProductCard';
import { UserStore } from '@demo/user-store';
import { FavoritesStore } from '@demo/favorites-store';

export const FavoriteProductsGrid: DirectorrNextComponent = () => {
  const { isLogin } = useStore(UserStore);
  const {
    products,
    isLoading,
    productsMap,
    isLoadingFavorites,
    addFavorite,
    removeFavorite,
    showProductDetailsModal,
  } = useStore(FavoritesStore);

  if (isLoading) return null;

  return (
    <Box my={2}>
      <Grid container spacing={2}>
        {products.map((id) => (
          <Grid key={id} item xs={3}>
            <ProductCard
              productID={id}
              productsMap={productsMap}
              isLoadingFavorites={isLoadingFavorites}
              addFavorite={addFavorite}
              removeFavorite={removeFavorite}
              isLogin={isLogin}
              onOpenModal={showProductDetailsModal}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default observer(FavoriteProductsGrid);
