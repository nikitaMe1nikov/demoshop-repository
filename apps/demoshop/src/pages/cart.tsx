import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { useStore } from '@nimel/directorr-react';
import { DirectorrNextComponent } from '@nimel/directorr-next';
import Grid from '@material-ui/core/Grid';
import Page from '@demoshop/components/Page';
import MainBar from '@demoshop/components/MainBar';
import ProductCard from '@demoshop/components/Cart/ProductCard';
import { CartStore } from '@demo/cart-store';
import { UserStore } from '@demo/user-store';
import CartPanel from '@demoshop/components/Cart/CartPanel';
import ProductDetailsModal from '@demoshop/components/Catalog/ProductDetailsModal';

export const Cart: DirectorrNextComponent = () => {
  const {
    sortProducts,
    productsMap,
    isLoadingDeleting,
    deleteFromCart,
    showProductDetailsModal,
  } = useStore(CartStore);
  const onOpenModal = useCallback(
    (productID: string) => showProductDetailsModal(productID, ProductDetailsModal),
    [showProductDetailsModal]
  );

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
                  onOpenModal={onOpenModal}
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
