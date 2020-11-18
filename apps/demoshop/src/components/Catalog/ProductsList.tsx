import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@nimel/directorr-react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ProductCard, { ProductCardLoading } from '@demoshop/components/Catalog/ProductCard';
import { CatalogStore } from '@demo/catalog-store';
import { useWindowScrollEnd } from '@demoshop/hooks/scroll';

export const ProductsList: FC = () => {
  const { products, loadMore, hasNextPage, isLoading } = useStore(CatalogStore);

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
            {products?.map((product) => (
              <Grid key={product.id} item xs={3}>
                <ProductCard product={product} />
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
