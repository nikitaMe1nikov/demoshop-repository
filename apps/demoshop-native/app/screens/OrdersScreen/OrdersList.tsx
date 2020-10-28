import React, { FC } from 'react';
import { StyleSheet, View, FlatList, RefreshControl } from 'react-native';
import { observer } from 'mobx-react-lite';
import { stretch, childrenCenter } from '@demoshop-native/components/layoutStyles';
import { Card, CardItem, H3 } from 'native-base';
import { useStore } from '@nimel/directorr-react';
import { OrdersStore } from '@demo/orders-store';
import platform from '@demoshop-native/theme/variables/platform';
import OrderItem from './OrderItem';

const styles = StyleSheet.create({
  list: {
    paddingVertical: platform.getSize(2),
  },
  loadingList: {
    paddingVertical: platform.getSize(2),
  },
  loadingHeader: {
    height: platform.getSize(4),
    backgroundColor: platform.skeletonBackgroundColor,
    flex: 1,
    borderRadius: 5,
  },
  loadingProduct: {
    height: platform.getSize(18),
    backgroundColor: platform.skeletonBackgroundColor,
    flex: 1,
    borderRadius: 5,
  },
});

const OrderItemLoading: FC = () => (
  <Card>
    <CardItem header>
      <View style={styles.loadingHeader} />
    </CardItem>
    <CardItem>
      <View style={styles.loadingProduct} />
    </CardItem>
  </Card>
);

const OrderListLoading: FC = () => (
  <View style={styles.loadingList}>
    <OrderItemLoading />
    <OrderItemLoading />
  </View>
);

function renderItem({ item }) {
  return <OrderItem order={item} />;
}

function keyExtractor(item: any) {
  return item.id;
}

const OrdersList: FC = () => {
  const { orders, isLoading, update, isUpdating } = useStore(OrdersStore);

  if (isLoading) return <OrderListLoading />;

  if (!orders.length)
    return (
      <View style={[stretch, childrenCenter]}>
        <H3>While the order list is empty</H3>
      </View>
    );
  // console.log('isUpdating', isUpdating);
  return (
    <FlatList
      style={styles.list}
      data={orders}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      refreshControl={
        <RefreshControl
          colors={[platform.tabMenuActiveIconColor]}
          refreshing={isUpdating}
          onRefresh={update}
        />
      }
    />
  );
};

export default observer(OrdersList);
