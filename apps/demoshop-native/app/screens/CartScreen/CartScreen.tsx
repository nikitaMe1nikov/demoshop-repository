import React, { useCallback, FC } from 'react';
import { observer } from 'mobx-react-lite';
import { StyleSheet, View, RefreshControl } from 'react-native';
import { Card, CardItem } from 'native-base';
import { useStore } from '@nimel/directorr-react';
import { Container, Content, Title, Body } from 'native-base';
import { CartStore } from '@demo/cart-store';
import ProductDetailsModal from '@demoshop-native/components/ProductDetails/ProductDetailsModal';
import { childrenCenter, childrenRow } from '@demoshop-native/components/layoutStyles';
import platform from '@demoshop-native/theme/variables/platform';
import Header from '@demoshop-native/components/Header';
import LoadingRect from '@demoshop-native/components/LoadingRect';
import { CatalogStore, Product } from '@demo/catalog-store';
import ProductCard from './ProductCard';
import CartPanel from './CartPanel';

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: platform.getSize(2),
    flexWrap: 'wrap',
  },
  card: {
    maxWidth: '50%',
  },
});

const CartLoading = () => (
  <Card>
    <CardItem header>
      <LoadingRect height={platform.getSize(6)} />
    </CardItem>
    <CardItem>
      <LoadingRect height={platform.getSize(6)} />
    </CardItem>
    <CardItem>
      <LoadingRect height={platform.getSize(12)} />
    </CardItem>
  </Card>
);

export const CartScreen: FC = () => {
  const { showProductDetailsModal } = useStore(CatalogStore);
  const {
    isLoading,
    sortProducts,
    productsMap,
    isLoadingDeleting,
    deleteFromCart,
    isUpdating,
    update,
  } = useStore(CartStore);
  const openModal = useCallback((product: Product) => {
    showProductDetailsModal(ProductDetailsModal, { product });
  }, []);

  return (
    <Container>
      <Header>
        <Body style={childrenCenter}>
          <Title>Cart</Title>
        </Body>
      </Header>
      <Content
        refreshControl={
          <RefreshControl
            colors={[platform.tabMenuActiveIconColor]}
            refreshing={isUpdating}
            onRefresh={update}
          />
        }
      >
        {isLoading ? (
          <CartLoading />
        ) : (
          <>
            <View style={[styles.list, childrenRow]}>
              {sortProducts.map((id) => (
                <ProductCard
                  key={id}
                  style={styles.card}
                  productID={id}
                  productsMap={productsMap}
                  isLoadingDeleting={isLoadingDeleting}
                  deleteFromCart={deleteFromCart}
                  openModal={openModal}
                />
              ))}
            </View>
            <CartPanel />
          </>
        )}
      </Content>
    </Container>
  );
};

export default observer(CartScreen);
