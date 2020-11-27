import bcrypt from 'bcrypt';
import { Product, Category, User, UserRole, Banner, Order, OrderStatus } from './gql-types';
import env from './env';

function generateList(templates: any[], total = 100, idPrefix: string) {
  const result = [];
  const { length } = templates;

  for (let i = 0, teml: any; i < total; ++i) {
    teml = templates[Math.round(Math.random() * (length - 1))];

    result.push(
      Object.assign({}, teml, {
        id: `${idPrefix}.${i}`,
        name: `${teml.name}.${idPrefix}.${i}`,
        price: Math.ceil(Math.random() * teml.price),
        recomendations: [`${idPrefix}.${i}`],
      })
    );
  }

  return result;
}

export interface ProductData extends Omit<Product, 'category' | 'recomendations'> {
  categoryID: string;
  recomendations: string[];
}

const PRODUCTS_TEMPLATES = [
  {
    name: 'Морковь',
    price: 50,
    categoryID: '2.1',
    description: 'Сладенькая морковь',
  },
  {
    name: 'Лук',
    price: 30,
    categoryID: '2.1',
    description: 'Ароматный лук',
  },
  {
    name: 'Картошка',
    price: 70,
    categoryID: '2.1',
    description: 'Крупная картошка',
  },
  {
    name: 'Свекла',
    price: 90,
    categoryID: '2.1',
    description: 'Сладкая свекла',
  },
  {
    name: 'Капуста',
    price: 110,
    categoryID: '2.1',
    description: 'Вкусная капуста',
  },
  {
    name: 'Петрушка',
    price: 10,
    categoryID: '2.1',
    description: 'Зеленая петрушка',
  },
  {
    name: 'Укроп',
    price: 30,
    categoryID: '2.1',
    description: 'Ароматный укроп',
  },
  {
    name: 'Помидоры',
    price: 70,
    categoryID: '2.1',
    description: 'Крупные помидоры',
  },
  {
    name: 'Банан',
    price: 75,
    categoryID: '2.2',
    description: 'Сладкий банан',
  },
  {
    name: 'Яблоко',
    price: 105,
    categoryID: '2.2',
    description: 'Кислое яблоко',
  },
  {
    name: 'Виноград',
    price: 275,
    categoryID: '2.2',
    description: 'Сладкий виноград',
  },
  {
    name: 'Груша',
    price: 125,
    categoryID: '2.2',
    description: 'Ароматныя груша',
  },
  {
    name: 'Вишня',
    price: 305,
    categoryID: '2.2',
    description: 'Крупная вишня',
  },
  {
    name: 'Абрикос',
    price: 205,
    categoryID: '2.2',
    description: 'Вкусный абрикос',
  },
  {
    name: 'Персик',
    price: 135,
    categoryID: '2.2',
    description: 'Сладкий персик',
  },
  {
    name: 'Свинина',
    price: 405,
    categoryID: '2.3',
    description: 'Свежее мясо',
  },
  {
    name: 'Говядина',
    price: 205,
    categoryID: '2.3',
    description: 'Свежее мясо',
  },
  {
    name: 'Баранина',
    price: 335,
    categoryID: '2.3',
    description: 'Свежее мясо',
  },
  {
    name: 'Оленина',
    price: 535,
    categoryID: '2.3',
    description: 'Свежее мясо',
  },
  {
    name: 'Курица',
    price: 135,
    categoryID: '2.3',
    description: 'Свежее мясо',
  },
  {
    name: 'Нарезка',
    price: 145,
    categoryID: '2.3',
    description: 'Свежее мясо',
  },
  {
    name: 'Фарш',
    price: 175,
    categoryID: '2.3',
    description: 'Свежее мясо',
  },
  {
    name: 'Сало',
    price: 175,
    categoryID: '2.3',
    description: 'Свежее мясо',
  },
  {
    name: 'Сок',
    price: 100,
    categoryID: '2.4',
    description: 'Свежей сок',
  },
  {
    name: 'Коктель',
    price: 55,
    categoryID: '2.4',
    description: 'Безалкогольный коктель',
  },
  {
    name: 'Квас',
    price: 60,
    categoryID: '2.4',
    description: 'Кислый квас',
  },
  {
    name: 'Чай',
    price: 80,
    categoryID: '2.4',
    description: 'Черный чай',
  },
  {
    name: 'Пиво',
    price: 120,
    categoryID: '2.4',
    description: 'Пенное пиво',
  },
  {
    name: 'Настойки',
    price: 220,
    categoryID: '2.4',
    description: 'Бодрая настойка',
  },
  {
    name: 'Вино',
    price: 275,
    categoryID: '2.4',
    description: 'Бодрое вино',
  },
];

export const PRODUCTS: ProductData[] = generateList(PRODUCTS_TEMPLATES, 500, '1').sort((a, b) => {
  if (a.name > b.name) {
    return 1;
  }

  if (a.name < b.name) {
    return -1;
  }

  return 0;
});

const CATEGORIES_TEMPLATES = [
  {
    id: '2.1',
    name: 'Овощи',
  },
  {
    id: '2.2',
    name: 'Фрукты',
  },
  {
    id: '2.3',
    name: 'Мясное',
  },
  {
    id: '2.4',
    name: 'Напитки',
  },
];

export type CategoryData = Category;

export const CATEGORIES: CategoryData[] = CATEGORIES_TEMPLATES.map((c) => ({
  ...c,
  // productsIDS: PRODUCTS.filter((p) => p.categoryID === c.id).map((p) => p.id),
})).sort((a, b) => {
  if (a.name > b.name) {
    return 1;
  }

  if (a.name < b.name) {
    return -1;
  }

  return 0;
});

export interface OrderData
  extends Pick<Order, 'id' | 'status' | 'total' | 'discount' | 'price' | 'totalByID'> {
  userID: string;
  products: ProductInOrder[];
}

export interface ProductInOrder {
  id: string;
  amount: number;
}

const productsInOrder = PRODUCTS.slice(0, 5).map((p, index) => ({
  id: p.id,
  amount: index + 1,
}));

export const ORDERS: OrderData[] = [
  {
    id: '4.1',
    status: OrderStatus.CREATED,
    total: 0,
    price: 0,
    discount: 0,
    products: [],
    userID: '3.1',
    totalByID: [],
  },
  {
    id: '4.2',
    status: OrderStatus.FILLED,
    total: productsInOrder.reduce((total: number, p: ProductInOrder) => total + p.amount, 0),
    price: productsInOrder.reduce(
      (price: number, p: ProductInOrder) =>
        price + (PRODUCTS.find((product) => product.id === p.id)?.price || 0) * p.amount,
      0
    ),
    discount: 0,
    products: productsInOrder,
    userID: '3.1',
    totalByID: productsInOrder.reduce((totalByID: string[], p: ProductInOrder) => {
      for (let i = 0; i < p.amount; i++) {
        totalByID.push(p.id);
      }

      return totalByID;
    }, []),
  },
];

export interface UserData extends Omit<User, 'favorites' | 'activeOrders'> {
  pashash: string;
  favorites: string[];
  orders: string[];
}

export const USERS: UserData[] = [
  {
    id: '3.1',
    email: 'mail@mail.com',
    name: 'UserOne',
    surname: '',
    pashash: bcrypt.hashSync('12345678', 3),
    roles: [UserRole.USER],
    favorites: [],
    orders: ORDERS.map((o) => o.id),
  },
];

const URL = `http://${env.HOSTNAME}:${env.PORT}/assets`;

export const BANNERS: Banner[] = [
  {
    id: '5.1',
    name: 'Sale',
    description: 'Buy it!!!',
    images: {
      small: `${URL}/sales1@1x.jpg`,
      medium: `${URL}/sales1@2x.jpg`,
      big: `${URL}/sales1@3x.jpg`,
    },
  },
  {
    id: '5.2',
    name: 'Second Sale',
    description: 'Please, buy it!!!',
    images: {
      small: `${URL}/sales2@1x.jpg`,
      medium: `${URL}/sales2@2x.jpg`,
      big: `${URL}/sales2@3x.jpg`,
    },
  },
  {
    id: '5.3',
    name: 'Best Banner',
    description: 'Must buy it!!!',
    images: {
      small: `${URL}/sales3@1x.jpg`,
      medium: `${URL}/sales3@2x.jpg`,
      big: `${URL}/sales3@3x.jpg`,
    },
  },
  {
    id: '5.4',
    name: 'Another Sale',
    description: 'Buy it!!!',
    images: {
      small: `${URL}/sales1@1x.jpg`,
      medium: `${URL}/sales1@2x.jpg`,
      big: `${URL}/sales1@3x.jpg`,
    },
  },
];
