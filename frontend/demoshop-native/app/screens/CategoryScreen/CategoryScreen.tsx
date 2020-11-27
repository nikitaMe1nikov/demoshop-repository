import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@nimel/directorr-react';
import { FlatList, View, ActivityIndicator, RefreshControl } from 'react-native';
import { Container, Title, Body } from 'native-base';
import { StyleSheet } from 'react-native';
import ProductCard, { ProductCardLoading, HEIGHT } from './ProductCard';
import { CatalogStore } from '@frontend/catalog-store';
import { ProductModelType } from '@frontend/gql';
import { childrenCenter, childrenRow } from 'components/layoutStyles';
import platform from 'theme/variables/platform';
import Header from 'components/Header';

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

function keyExtractor(item: ProductModelType) {
  return item.id;
}

function ListFooterComponent() {
  return (
    <View style={[childrenCenter, styles.footerLoader]}>
      <ActivityIndicator size="large" color={platform.tabMenuActiveIconColor} />
    </View>
  );
}

function renderItem({ item }: { item: ProductModelType }) {
  return <ProductCard style={styles.card} product={item} />;
}

export const CategoryScreen: FC = () => {
  const {
    products,
    loadMore,
    hasNextPage,
    isLoading,
    currentCategory,
    updateList,
    isUpdating,
  } = useStore(CatalogStore);

  return (
    <Container>
      <Header>
        {!isLoading && (
          <Body style={childrenCenter}>
            <Title>{currentCategory?.name}</Title>
          </Body>
        )}
      </Header>
      {isLoading ? (
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
          ListFooterComponent={hasNextPage ? ListFooterComponent : null}
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
