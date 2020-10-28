import React, { FC, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@nimel/directorr-react';
import { FlatList, View, ActivityIndicator, RefreshControl } from 'react-native';
import { Container, Title, Body } from 'native-base';
import { StyleSheet } from 'react-native';
import ProductCard, { ProductCardLoading, HEIGHT } from './ProductCard';
import { CatalogStore, Product } from '@demo/catalog-store';
import { UserStore } from '@demo/user-store';
import { childrenCenter, childrenRow } from '@demoshop-native/components/layoutStyles';
import platform from '@demoshop-native/theme/variables/platform';
import Header from '@demoshop-native/components/Header';
import ProductDetailsModal from '@demoshop-native/components/ProductDetails/ProductDetailsModal';

const styles = StyleSheet.create({
  list: {
    flex: 1,
    margin: 0,
    padding: platform.getSize(2),
  },
  footerLoader: {
    height: platform.getSize(24),
    flex: 1,
  },

  // hack
  columnWrapperStyle: {
    marginVertical: -4,
  },

  card: {
    maxWidth: '50%',
    flex: 1,
    padding: platform.getSize(2),
  },
});

function getItemLayout(data: any, index: number) {
  return { length: HEIGHT, offset: HEIGHT * index, index };
}

function keyExtractor(item: string) {
  return item;
}

function ListFooterComponent() {
  return (
    <View style={[childrenCenter, styles.footerLoader]}>
      <ActivityIndicator size="large" color={platform.tabMenuActiveIconColor} />
    </View>
  );
}

export const CategoryScreen: FC = () => {
  const {
    products,
    loadMore,
    hasNextPage,
    isLoading,
    productsMap,
    isLoadingFavorites,
    addFavorite,
    removeFavorite,
    currentCategory,
    showProductDetailsModal,
    updateList,
    isUpdating,
  } = useStore(CatalogStore);
  const { isLogin, isLoading: isLoadingUser } = useStore(UserStore);
  const onOpenModal = useCallback((product: Product) => {
    showProductDetailsModal(ProductDetailsModal, { product });
  }, []);
  const renderItem = useCallback(
    ({ item }) => (
      <ProductCard
        style={styles.card}
        productID={item}
        productsMap={productsMap}
        isLoadingFavorites={isLoadingFavorites}
        addFavorite={addFavorite}
        removeFavorite={removeFavorite}
        isLogin={isLogin}
        onOpenModal={onOpenModal}
      />
    ),
    []
  );

  return (
    <Container>
      <Header>
        {!isLoading && (
          <Body style={childrenCenter}>
            <Title>{currentCategory.name}</Title>
          </Body>
        )}
      </Header>
      {isLoading || isLoadingUser ? (
        <View style={styles.list}>
          <View style={childrenRow}>
            <ProductCardLoading />
            <ProductCardLoading />
          </View>
          <View style={childrenRow}>
            <ProductCardLoading />
            <ProductCardLoading />
          </View>
        </View>
      ) : (
        <FlatList
          style={styles.list}
          columnWrapperStyle={styles.columnWrapperStyle}
          data={products}
          renderItem={renderItem}
          getItemLayout={getItemLayout}
          keyExtractor={keyExtractor}
          numColumns={2}
          onEndReachedThreshold={1}
          onEndReached={loadMore}
          ListFooterComponent={hasNextPage && ListFooterComponent}
          refreshControl={
            <RefreshControl
              colors={[platform.tabMenuActiveIconColor]}
              refreshing={isUpdating}
              onRefresh={updateList}
            />
          }
        />
      )}
    </Container>
  );
};

export default observer(CategoryScreen);
