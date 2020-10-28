import { CATEGORIES_URL, CATEGORY_URL, CART_URL, ORDERS_URL, USER_URL } from '@demo/url';

const LINKING_ROOT_URL = '';

const LINKING = {
  prefixes: [],
  config: {
    screens: {
      MainNavigator: {
        path: LINKING_ROOT_URL,
        initialRouteName: 'home',
        screens: {
          home: LINKING_ROOT_URL,
          catalog: {
            initialRouteName: 'categories',
            screens: {
              categories: CATEGORIES_URL,
              category: CATEGORY_URL,
            },
          },
          cart: CART_URL,
          orders: ORDERS_URL,
          profile: USER_URL,
        },
      },
    },
  },
};

export default LINKING;
