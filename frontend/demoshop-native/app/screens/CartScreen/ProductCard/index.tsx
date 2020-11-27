import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@nimel/directorr-react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Card, CardItem, Text, Button } from 'native-base';
import { childrenColumn, childrenCrossStart } from 'components/layoutStyles';
import ProductAmountButton from 'screens/CartScreen/ProductAmountButton';
import { DOL } from '@frontend/constants';
import { ProductModelType } from '@frontend/gql';
import { ModalBoxStore } from '@frontend/modal-box';
import ProductDetailsModal from 'components/ProductDetails/ProductDetailsModal';
import platform from 'theme/variables/platform';
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
  product: ProductModelType;
}

export const ProductCard: FC<ProductCardProps> = ({ style, product }) => {
  const { open } = useStore(ModalBoxStore);
  const onPressImage = () => open(ProductDetailsModal, { product });

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
        <ProductAmountButton product={product} addToCartTittle={REVERT_TO_CART_TITTLE} />
      </CardItem>
      <DeleteIcon
        style={styles.deleteIcon}
        isLoading={product.isLoadingDelete}
        deleteFromCart={product.deleteFromCart}
      />
    </Card>
  );
};

export default observer(ProductCard);
