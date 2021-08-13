import { createConnection } from 'typeorm';
import { databaseConfig } from './config';
import { Cart } from './entity/Cart';
import { Category } from './entity/Category';
import { DeliveryInfo } from './entity/DeliveryInfo';
import { Goods } from './entity/Goods';
import { GoodsImg } from './entity/GoodsImg';
import { OrderItem } from './entity/OrderItem';
import { OrderList } from './entity/OrderList';
import { Payment } from './entity/Payment';
import { Promotion } from './entity/Promotion';
import { User } from './entity/User';
import { UserAddress } from './entity/UserAddress';
import { Wish } from './entity/Wish';

export default async function () {
  await createConnection({
    type: 'mysql',
    ...databaseConfig,
    entities: [
      User,
      UserAddress,
      Cart,
      OrderItem,
      OrderList,
      Goods,
      GoodsImg,
      Category,
      DeliveryInfo,
      Payment,
      Promotion,
      Wish,
    ], // TODO: add entities
  });
}
