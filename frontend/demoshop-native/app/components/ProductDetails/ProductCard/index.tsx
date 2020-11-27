import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@nimel/directorr-react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Card, CardItem, Text, Button, Icon } from 'native-base';
import { childrenColumn, childrenCrossStart } from 'components/layoutStyles';
import ProductAmountButton from 'screens/CartScreen/ProductAmountButton';
import ProductDetailsModal from 'components/ProductDetails/ProductDetailsModal';
import { DOL } from '@frontend/constants';
import { ProductModelType } from '@frontend/gql';
import { UserStore } from '@frontend/user-store';
import { ModalBoxStore } from '@frontend/modal-box';
import platform from 'theme/variables/platform';

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
  favorite?: boolean;
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
      {isLogin && <FavoriteIcon style={styles.favoriteIcon} favorite={product.favorite} />}
    </Card>
  );
};

export default observer(ProductCard);
