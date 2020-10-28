import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@nimel/directorr-react';
import { Card, CardItem, Text, Left, Right } from 'native-base';
import { DOL } from '@demo/constants';
import ButtonLoading from '@demoshop-native/components/ButtonLoading';
import { CartStore } from '@demo/cart-store';
import {
  stretch,
  childrenColumn,
  childrenCrossStart,
} from '@demoshop-native/components/layoutStyles';

export const CartPanel: FC = () => {
  const { price, total, discount, isEmpty, fillCart, isLoadingFill, isUpdating } = useStore(
    CartStore
  );

  if (isEmpty) {
    return (
      <Card>
        <CardItem header style={[childrenColumn, childrenCrossStart]}>
          <Text>Cart</Text>
          <Text note>Cart is empty</Text>
        </CardItem>
      </Card>
    );
  }

  return (
    <Card>
      <CardItem header>
        <Text>Cart</Text>
      </CardItem>
      <CardItem>
        <Left>
          <Text>Total items</Text>
        </Left>
        <Right>
          <Text>{total}</Text>
        </Right>
      </CardItem>
      <CardItem>
        <Left>
          <Text>Discont</Text>
        </Left>
        <Right>
          <Text>{discount}</Text>
        </Right>
      </CardItem>
      <CardItem>
        <Left>
          <Text>Total price</Text>
        </Left>
        <Right>
          <Text>{`${price} ${DOL}`}</Text>
        </Right>
      </CardItem>
      <CardItem footer>
        <ButtonLoading
          style={stretch}
          label="Checkout"
          isLoading={isLoadingFill}
          disabled={isUpdating}
          onPress={fillCart}
        />
      </CardItem>
    </Card>
  );
};

export default observer(CartPanel);
