import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { childrenCenter, stretch } from '@demoshop-native/components/layoutStyles';
import { Container, Title, Body, H3, Button, Text } from 'native-base';
import { useStore } from '@nimel/directorr-react';
import { UserStore } from '@demo/user-store';
import Header from '@demoshop-native/components/Header';
import platform from '@demoshop-native/theme/variables/platform';
import OrdersScreenStore from './OrdersScreen.store';
import OrdersList from './OrdersList';

const styles = StyleSheet.create({
  loginButton: {
    marginTop: platform.getSize(4),
    alignSelf: 'auto',
  },
});

const WhenNotLogin: FC = () => {
  const { pushToProfile } = useStore(OrdersScreenStore);

  return (
    <View style={[stretch, childrenCenter]}>
      <H3>There will be a list of orders when you login</H3>
      <Button style={styles.loginButton} onPress={pushToProfile}>
        <Text>Login</Text>
      </Button>
    </View>
  );
};

export const OrdersScreen: FC = () => {
  const { isLogin } = useStore(UserStore);

  return (
    <Container>
      <Header>
        <Body style={childrenCenter}>
          <Title>Orders</Title>
        </Body>
      </Header>
      {isLogin ? <OrdersList /> : <WhenNotLogin />}
    </Container>
  );
};

export default observer(OrdersScreen);
