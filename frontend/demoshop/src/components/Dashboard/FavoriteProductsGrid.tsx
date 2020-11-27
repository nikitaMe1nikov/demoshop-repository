import React from 'react';
import { observer } from 'mobx-react-lite';
import Box from '@material-ui/core/Box';
import { useStore } from '@nimel/directorr-react';
import { DirectorrNextComponent } from '@nimel/directorr-next';
import Grid from '@material-ui/core/Grid';
import ProductCard from 'components/Catalog/ProductCard';
import { FavoritesStore } from '@frontend/favorites-store';

export const FavoriteProductsGrid: DirectorrNextComponent = () => {
  const { products, isLoading } = useStore(FavoritesStore);

  if (isLoading) return null;

  return (
    <Box my={2}>
      <Grid container spacing={2}>
        {products?.map((product) => (
          <Grid key={product.id} item xs={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default observer(FavoriteProductsGrid);
