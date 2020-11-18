import React from 'react';
import { observer } from 'mobx-react-lite';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { useStore } from '@nimel/directorr-react';
import Grid from '@material-ui/core/Grid';
import Page from '@demoshop/components/Page';
import MainBar from '@demoshop/components/MainBar';
import ProductCard from '@demoshop/components/Cart/ProductCard';
import { CartStore } from '@demo/cart-store';
import CartPanel from '@demoshop/components/Cart/CartPanel';

export const Cart = () => {
  const { sortProducts } = useStore(CartStore);

  return (
    <Page>
      <MainBar title="Cart" />
      <Container maxWidth="md">
        <Box my={2}>
          <Grid container spacing={2}>
            {sortProducts.map((product) => (
              <Grid key={product.id} item xs={3}>
                <ProductCard product={product} />
              </Grid>
            ))}
            <Grid item xs={12}>
              <CartPanel />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Page>
  );
};

export default observer(Cart);
