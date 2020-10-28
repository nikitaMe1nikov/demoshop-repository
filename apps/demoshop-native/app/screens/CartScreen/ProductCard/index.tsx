import React, { FC, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Card, CardItem, Text, Button } from 'native-base';
import { childrenColumn, childrenCrossStart } from '@demoshop-native/components/layoutStyles';
import ProductAmountButton from '@demoshop-native/screens/CartScreen/ProductAmountButton';
import { DOL } from '@demo/constants';
import { Product } from '@demo/catalog-store';
import platform from '@demoshop-native/theme/variables/platform';
import DeleteIcon from './DeleteIcon';

export const HEIGHT = platform.getSize(84);
const REVERT_TO_CART_TITTLE = 'back in cart';

const styles = StyleSheet.create({
  card: {
    height: HEIGHT,
    padding: platform.getSize(2),
  },
  textContainer: {
    marginVertical: platform.getSize(2),
  },
  deleteIcon: {
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
});

interface ProductCardProps {
  style?: StyleProp<ViewStyle>;
  productID: string;
  productsMap: Map<string, Product>;
  isLoadingDeleting: Map<string, null>;
  deleteFromCart: (id: string) => void;
  onOpenModal: (product: Product) => void;
}

export const ProductCard: FC<ProductCardProps> = ({
  style,
  productID,
  productsMap,
  isLoadingDeleting,
  deleteFromCart,
  onOpenModal,
}) => {
  const { name, price, favorite } = productsMap.get(productID);
  const isLoading = isLoadingDeleting.has(productID);
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
        <ProductAmountButton productID={productID} addToCartTittle={REVERT_TO_CART_TITTLE} />
      </CardItem>
      <DeleteIcon
        style={styles.deleteIcon}
        isLoading={isLoading}
        productID={productID}
        deleteFromCart={deleteFromCart}
      />
    </Card>
  );
};

export default observer(ProductCard);
