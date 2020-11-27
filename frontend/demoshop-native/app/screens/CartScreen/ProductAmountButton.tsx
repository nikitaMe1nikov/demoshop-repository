import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { StyleSheet, View, StyleProp, ViewStyle, ActivityIndicator } from 'react-native';
import { Text, Icon, Button } from 'native-base';
import { ProductModelType } from '@frontend/gql';
import i18n from '@frontend/i18n';
import { childrenCenter } from 'components/layoutStyles';
import platform from 'theme/variables/platform';

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
  product: ProductModelType;
  style?: StyleProp<ViewStyle>;
  addToCartTittle?: string;
}

export const ProductAmountButton: FC<ProductAmountButtonProps> = ({
  style,
  product: { amount, isLoadingAmount, addToCart, removeFromCart },
  addToCartTittle = i18n.addInCart,
}) => {
  if (amount || isLoadingAmount) {
    return (
      <View style={[styles.buttons, style]}>
        <Button style={styles.squareButton} primary transparent onPress={removeFromCart}>
          <Icon type="MaterialCommunityIcons" name="minus" />
        </Button>
        <View style={[styles.amountContainer, childrenCenter]}>
          {isLoadingAmount ? (
            <ActivityIndicator size="large" color={platform.tabMenuActiveIconColor} />
          ) : (
            <Text>{amount}</Text>
          )}
        </View>
        <Button style={styles.squareButton} primary transparent onPress={addToCart}>
          <Icon type="MaterialCommunityIcons" name="plus" />
        </Button>
      </View>
    );
  }

  return (
    <Button style={[styles.button, style]} full primary transparent onPress={addToCart}>
      <Text>{addToCartTittle}</Text>
    </Button>
  );
};

export default observer(ProductAmountButton);
