import React, { FC, memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { childrenMainCenter } from 'components/layoutStyles';
import { Body, Text, Right, Card, CardItem, H3 } from 'native-base';
import { DOL } from '@frontend/constants';
import { Order, Product } from '@frontend/orders-store';
import platform from 'theme/variables/platform';

const styles = StyleSheet.create({
  image: {
    height: platform.getSize(14),
    width: platform.getSize(14),
    marginRight: platform.getSize(4),
    backgroundColor: platform.skeletonBackgroundColor,
    borderRadius: 5,
  },
});

const ProductImage: FC = () => <View style={styles.image} />;

interface ProductItemProps {
  product: Product;
}

const ProductItem: FC<ProductItemProps> = memo(({ product }) => (
  <CardItem>
    <ProductImage />
    <Body style={childrenMainCenter}>
      <Text>{product.name}</Text>
      <Text note>{`${product.price} ${DOL}`}</Text>
    </Body>
    <Right>
      <Text>{product.amount}</Text>
      <Text note />
    </Right>
  </CardItem>
));

interface OrderItemProps {
  order: Order;
}

const OrderItem: FC<OrderItemProps> = ({ order }) => (
  <Card>
    <CardItem header>
      <H3>{`№ ${order.id}`}</H3>
    </CardItem>
    {order.products.map((p) => (
      <ProductItem key={p.id} product={p} />
    ))}
  </Card>
);

export default memo(OrderItem);
