import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import { Card, CardItem, Text, Button } from 'native-base';
import { useStore } from '@nimel/directorr-react';
import { childrenColumn, childrenCrossStart } from 'components/layoutStyles';
import { ProductModelType } from '@frontend/gql';
import ProductAmountButton from 'screens/CartScreen/ProductAmountButton';
import ProductDetailsModal from 'components/ProductDetails/ProductDetailsModal';
import { DOL } from '@frontend/constants';
import { UserStore } from '@frontend/user-store';
import { ModalBoxStore } from '@frontend/modal-box';

import platform from 'theme/variables/platform';
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
  product: ProductModelType;
}

export const ProductCard: FC<ProductCardProps> = ({ style, product }) => {
  const { isLogin } = useStore(UserStore);
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
        <ProductAmountButton product={product} />
      </CardItem>
      {isLogin && <FavoriteIcon style={styles.favoriteIcon} product={product} />}
    </Card>
  );
};

export default observer(ProductCard);
