import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { StyleSheet, View, RefreshControl } from 'react-native';
import { Card, CardItem } from 'native-base';
import { useStore } from '@nimel/directorr-react';
import { Container, Content, Title, Body } from 'native-base';
import { CartStore } from '@frontend/cart-store';
import { childrenCenter, childrenRow } from 'components/layoutStyles';
import platform from 'theme/variables/platform';
import Header from 'components/Header';
import LoadingRect from 'components/LoadingRect';
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
  const { isLoading, sortProducts, isUpdating, update } = useStore(CartStore);

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
              {sortProducts.map((p) => (
                <ProductCard key={p.id} style={styles.card} product={p} />
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
