import React, { FC, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@nimel/directorr-react';
import { StyleSheet, View, StyleProp, ViewStyle, ActivityIndicator } from 'react-native';
import {
  // Container,
  // Header,
  // Content,
  // Card,
  // CardItem,
  // Title,
  // Body,
  // ListItem,
  Text,
  // Left,
  // Right,
  // Center,
  Icon,
  Button,
} from 'native-base';
import { CartStore, Product } from '@demo/cart-store';
import { EMPTY_OBJECT } from '@demoshop-native/utils/constants';
import i18n from '@demo/i18n';
import { childrenCenter } from '@demoshop-native/components/layoutStyles';
import platform from '@demoshop-native/theme/variables/platform';

const styles = StyleSheet.create({
  button: {
    width: '100%',
  },
  amountContainer: {
    flexGrow: 1,
  },
  buttons: {
    flexDirection: 'row',
  },
  squareButton: {
    borderRadius: 4,
  },
});

interface ProductAmountButtonProps {
  productID: string;
  style?: StyleProp<ViewStyle>;
  addToCartTittle?: string;
}

export const ProductAmountButton: FC<ProductAmountButtonProps> = ({
  style,
  productID,
  addToCartTittle = i18n.addInCart,
}) => {
  const { productsMap, addToCart, removeFromCart, isLoadingChange } = useStore(CartStore);
  const { amount } = productsMap.get(productID) || (EMPTY_OBJECT as Product);
  const isLoading = isLoadingChange.has(productID);

  const addAmount = useCallback(() => addToCart(productID), [addToCart, productID]);
  const removeAmount = useCallback(() => removeFromCart(productID), [productID, removeFromCart]);

  if (amount || isLoading) {
    return (
      <View style={[styles.buttons, style]}>
        <Button style={styles.squareButton} primary transparent onPress={removeAmount}>
          <Icon type="MaterialCommunityIcons" name="minus" />
        </Button>
        <View style={[styles.amountContainer, childrenCenter]}>
          {isLoading ? (
            <ActivityIndicator size="large" color={platform.tabMenuActiveIconColor} />
          ) : (
            <Text>{amount}</Text>
          )}
        </View>
        <Button style={styles.squareButton} primary transparent onPress={addAmount}>
          <Icon type="MaterialCommunityIcons" name="plus" />
        </Button>
      </View>
    );
  }

  return (
    <Button style={[styles.button, style]} full primary transparent onPress={addAmount}>
      <Text>{addToCartTittle}</Text>
    </Button>
  );
};

export default observer(ProductAmountButton);
