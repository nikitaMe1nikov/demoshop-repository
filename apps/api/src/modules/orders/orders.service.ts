import { Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';
import { UserData, ORDERS, OrderData } from 'db';
import { OrderStatus } from 'modules/gql.schema';

@Injectable()
export default class OrdersService {
  idsBatcher = new DataLoader((ids: string[]) =>
    Promise.resolve(ids.map((id) => ORDERS.find((v) => v.id === id)))
  );

  whereUserId(userID: string) {
    return ORDERS.find((o) => o.userID == userID);
  }

  whereId(id: string) {
    return this.idsBatcher.load(id);
  }

  whereIds(ids: string[]) {
    return (this.idsBatcher.loadMany(ids) as unknown) as Promise<OrderData[]>;
  }

  createAnonimOrder() {
    return {
      id: '0',
      userID: '0',
      status: OrderStatus.CREATED,
      total: 0,
      price: 0,
      discount: 0,
      products: [],
    };
  }

  createOrder(user: UserData, anonimOrder: OrderData = this.createAnonimOrder()): OrderData {
    const newOrder = {
      ...anonimOrder,
      id: '4.' + ORDERS.length + 1,
      userID: user.id,
    };

    ORDERS.push(newOrder);

    return newOrder;
  }
}
