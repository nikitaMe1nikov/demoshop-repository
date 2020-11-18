import React, { FC, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import { Card, CardItem, Text, Button } from 'native-base';
import {
  // childrenCenter,
  // childrenRow,
  childrenColumn,
  // childrenMainStart,
  // backgroundColorError,
  childrenCrossStart,
} from '@demoshop-native/components/layoutStyles';
import ProductAmountButton from '@demoshop-native/screens/CartScreen/ProductAmountButton';
import { DOL } from '@demo/constants';
import { Product } from '@demo/catalog-store';
import platform from '@demoshop-native/theme/variables/platform';
import FavoriteIcon from './FavoriteIcon';

export const HEIGHT = platform.getSize(84);

const styles = StyleSheet.create({
  card: {
    height: HEIGHT,
  },
  textContainer: {
    marginVertical: platform.getSize(2),
  },
  favoriteIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  loadingCard: {
    height: HEIGHT,
    width: '50%',
    padding: platform.getSize(2),
  },
  loading: {
    flex: 1,
    backgroundColor: platform.skeletonBackgroundColor,
    borderRadius: 5,
  },
  image: {
    height: platform.getSize(50),
    width: '100%',
    backgroundColor: platform.skeletonBackgroundColor,
    borderRadius: 5,
  },
});

export const ProductCardLoading: FC = () => (
  <View style={styles.loadingCard}>
    <View style={styles.loading} />
  </View>
);

interface ProductCardProps {
  style?: StyleProp<ViewStyle>;
  productID: string;
  isLogin: boolean;
  productsMap: Map<string, Product>;
  isLoadingFavorites: Map<string, null>;
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  openModal: (product: Product) => void;
}

export const ProductCard: FC<ProductCardProps> = ({
  style,
  productID,
  productsMap,
  isLoadingFavorites,
  addFavorite,
  removeFavorite,
  isLogin,
  openModal,
}) => {
  const product = productsMap.get(productID);
  const isLoading = isLoadingFavorites.has(productID);
  const onPressImage = useCallback(() => openModal(product), [openModal, product]);

  return (
    <Card transparent style={[styles.card, style]}>
      <CardItem cardBody>
        <Button transparent style={styles.image} onPress={onPressImage} />
      </CardItem>
      <CardItem cardBody style={[childrenColumn, childrenCrossStart, styles.textContainer]}>
        <Text>{product.name}</Text>
        <Text>
          {product.price} {DOL}
        </Text>
      </CardItem>
      <CardItem cardBody>
        <ProductAmountButton productID={product.id} />
      </CardItem>
      {isLogin && (
        <FavoriteIcon
          style={styles.favoriteIcon}
          isLoading={isLoading}
          productID={productID}
          favorite={product.favorite}
          addFavorite={addFavorite}
          removeFavorite={removeFavorite}
        />
      )}
    </Card>
  );
};

export default observer(ProductCard);
