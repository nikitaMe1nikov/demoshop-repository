import React from 'react';
import { observer } from 'mobx-react-lite';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { useStore } from '@nimel/directorr-react';
import { DirectorrNextComponent } from '@nimel/directorr-next';
import Grid from '@material-ui/core/Grid';
import Page from 'components/Page';
import MainBar from 'modules/MainBar';
import ProductCard from 'modules/Cart/ProductCard';
import CartStore from 'modules/Cart/CartStore';
import UserStore from 'modules/Profile/UserStore';
import CartPanel from 'modules/Cart/CartPanel';

export const Cart: DirectorrNextComponent = () => {
  const {
    sortProducts,
    productsMap,
    isLoadingDeleting,
    deleteFromCart,
    showProductDetailsModal,
  } = useStore(CartStore);

  return (
    <Page>
      <MainBar title="Cart" />
      <Container maxWidth="md">
        <Box my={2}>
          <Grid container spacing={2}>
            {sortProducts.map((id) => (
              <Grid key={id} item xs={3}>
                <ProductCard
                  productID={id}
                  productsMap={productsMap}
                  isLoadingDeleting={isLoadingDeleting}
                  deleteFromCart={deleteFromCart}
                  onOpenModal={showProductDetailsModal}
                />
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

Cart.whenServerLoadDirectorr = (directorr) => {
  directorr.addStores(CartStore, UserStore);
};

export default observer(Cart);
