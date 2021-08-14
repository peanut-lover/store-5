import { createConnection } from 'typeorm';
import { databaseConfig } from './config';
import { Cart } from './entity/Cart';
import { Category } from './entity/Category';
import { Goods } from './entity/Goods';
import { GoodsImg } from './entity/GoodsImg';
import { OrderItem } from './entity/OrderItem';
import { OrderList } from './entity/OrderList';
import { Payment } from './entity/Payment';
import { Promotion } from './entity/Promotion';
import { User } from './entity/User';
import { UserAddress } from './entity/UserAddress';
import { Wish } from './entity/Wish';
import { CategoryRepository } from './repository/category.repository';

export default async function () {
  await createConnection({
    type: 'mysql',
    ...databaseConfig,
    entities: [User, UserAddress, Cart, OrderItem, OrderList, Goods, GoodsImg, Category, Payment, Promotion, Wish], // TODO: add entities
  });
  await populate();
}

async function populate() {
  const categories = ['문구', '잡화', '생필품'];
  categories.forEach((name) => createCategory(name));
}

async function createCategory(name: string) {
  const res = await CategoryRepository.getCategoryByName(name);
  if (!res) {
    await CategoryRepository.createCategory(name);
  }
}
