import React, { FC, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Card, CardItem, Text, Button, Icon } from 'native-base';
import { childrenColumn, childrenCrossStart } from '@demoshop-native/components/layoutStyles';
import ProductAmountButton from '@demoshop-native/screens/CartScreen/ProductAmountButton';
import { DOL } from '@demo/constants';
import { Product } from '@demo/catalog-store';
import platform from '@demoshop-native/theme/variables/platform';

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
  image: {
    height: platform.getSize(50),
    width: '100%',
    backgroundColor: platform.skeletonBackgroundColor,
    borderRadius: 5,
  },
  iconRed: {
    color: platform.brandDanger,
  },
  iconGrey: {
    color: platform.brandLight,
  },
});

interface FavoriteIconProps {
  style?: StyleProp<ViewStyle>;
  favorite: boolean;
}

export const FavoriteIcon: FC<FavoriteIconProps> = ({ style, favorite }) => (
  <Icon
    type="MaterialCommunityIcons"
    name="cards-heart"
    style={[style, favorite ? styles.iconRed : styles.iconGrey]}
  />
);

interface ProductCardProps {
  style?: StyleProp<ViewStyle>;
  productID: string;
  isLogin: boolean;
  productsMap: Map<string, Product>;
  onOpenModal: (product: Product) => void;
}

export const ProductCard: FC<ProductCardProps> = ({
  style,
  productID,
  productsMap,
  isLogin,
  onOpenModal,
}) => {
  const { name, price, favorite } = productsMap.get(productID);
  const onPressImage = useCallback(() => onOpenModal({ id: productID, name, price, favorite }), [
    onOpenModal,
    productID,
  ]);

  return (
    <Card transparent style={[styles.card, style]}>
      <CardItem cardBody>
        <Button transparent style={styles.image} onPress={onPressImage} />
      </CardItem>
      <CardItem cardBody style={[childrenColumn, childrenCrossStart, styles.textContainer]}>
        <Text>{name}</Text>
        <Text>
          {price} {DOL}
        </Text>
      </CardItem>
      <CardItem cardBody>
        <ProductAmountButton productID={productID} />
      </CardItem>
      {isLogin && <FavoriteIcon style={styles.favoriteIcon} favorite={favorite} />}
    </Card>
  );
};

export default observer(ProductCard);
