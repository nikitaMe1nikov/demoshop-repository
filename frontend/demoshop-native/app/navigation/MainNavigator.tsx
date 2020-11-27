import React, { memo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'native-base';
import { StyleSheet } from 'react-native';
import AppLoadFromStore from 'stores/AppLoadFromStore';
import { SnackbarStore } from 'components/Snackbar';
import { UserStore } from '@frontend/user-store';
import { AppInit } from '@nimel/directorr-appinitializer-react';
import HomeScreen from 'screens/HomeScreen/HomeScreen';
import CatalogNavigator from './CatalogNavigator';
import CartScreen from 'screens/CartScreen/CartScreen';
import OrdersScreen from 'screens/OrdersScreen/OrdersScreen';
import ProfileScreen from 'screens/ProfileScreen/ProfileScreen';
import CartIcon from 'screens/CartScreen/CartIcon';
import platform from 'theme/variables/platform';

const styles = StyleSheet.create({
  active: {
    color: platform.tabMenuActiveIconColor,
  },
  inactive: {
    color: platform.tabMenuInactiveIconColor,
  },
});

export type MainParamList = {
  home: undefined;
  catalog: undefined;
  cart: undefined;
  orders: undefined;
  profile: undefined;
};

const Tab = createBottomTabNavigator<MainParamList>();
const stores = [UserStore, SnackbarStore, AppLoadFromStore];

export function MainNavigator() {
  return (
    <AppInit stores={stores}>
      <Tab.Navigator
        tabBarOptions={{
          showLabel: false,
          style: {
            backgroundColor: platform.tabMenuBg,
          },
        }}
        backBehavior="history"
      >
        <Tab.Screen
          options={{
            tabBarIcon: ({ size, focused }) => (
              <Icon
                style={focused ? styles.active : styles.inactive}
                type="MaterialCommunityIcons"
                name="home"
                fontSize={size}
              />
            ),
          }}
          name="home"
          component={HomeScreen}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ size, focused }) => (
              <Icon
                style={focused ? styles.active : styles.inactive}
                type="MaterialCommunityIcons"
                name="view-grid"
                fontSize={size}
              />
            ),
          }}
          name="catalog"
          component={CatalogNavigator}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused, size }) => (
              <CartIcon style={focused ? styles.active : styles.inactive} fontSize={size} />
            ),
          }}
          name="cart"
          component={CartScreen}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused, size }) => (
              <Icon
                style={focused ? styles.active : styles.inactive}
                type="MaterialCommunityIcons"
                name="reorder-horizontal"
                fontSize={size}
              />
            ),
          }}
          name="orders"
          component={OrdersScreen}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused, size }) => (
              <Icon
                style={focused ? styles.active : styles.inactive}
                type="MaterialCommunityIcons"
                name="account"
                fontSize={size}
              />
            ),
          }}
          name="profile"
          component={ProfileScreen}
        />
      </Tab.Navigator>
    </AppInit>
  );
}

export default memo(MainNavigator);
