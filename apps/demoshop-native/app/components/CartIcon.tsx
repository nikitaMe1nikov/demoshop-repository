import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@nimel/directorr-react';
import { StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Text, Badge, Icon } from 'native-base';
import { CartStore } from '@demo/cart-store';

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    bottom: 2,
    left: '50%',
  },
});

interface CartIconProps {
  fontSize: number;
  style?: StyleProp<ViewStyle & TextStyle>;
}

export const CartIcon: FC<CartIconProps> = ({ style, fontSize }) => {
  const { total } = useStore(CartStore);

  return (
    <>
      <Icon style={style} type="MaterialCommunityIcons" name="cart" fontSize={fontSize} />
      {!!total && (
        <Badge style={[styles.badge, style]} primary>
          <Text>{total}</Text>
        </Badge>
      )}
    </>
  );
};

export default observer(CartIcon);
