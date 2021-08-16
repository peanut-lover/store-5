import { createConnection } from 'typeorm';
import { databaseConfig } from './config';
import { DeliveryInfo } from './entity/DeliveryInfo';
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
import { UserRepository } from './repository/user.repository';
import { UserAddressRepository } from './repository/user.address.repository';

export default async function () {
  await createConnection({
    type: 'mysql',
    ...databaseConfig,
    entities: [
      User,
      UserAddress,
      DeliveryInfo,
      Cart,
      OrderItem,
      OrderList,
      Goods,
      GoodsImg,
      Category,
      Payment,
      Promotion,
      Wish,
    ], // TODO: add entities
  });
  await populate();
}

async function populate() {
  await createDefaultUser('아이유');
  await createDefaultAddress();
  const categories = ['문구', '잡화', '생필품'];
  categories.forEach((name) => createCategory(name));
}

async function createDefaultUser(name: string) {
  const result = await UserRepository.findByGitHubId('1');
  if (!result) {
    await UserRepository.create('1', name);
  }
}

async function createCategory(name: string) {
  const res = await CategoryRepository.getCategoryByName(name);
  if (!res) {
    await CategoryRepository.createCategory(name);
  }
}

async function createDefaultAddress() {
  const body = {
    name: '아이유',
    receiver: '아이유',
    zipCode: '08123',
    address: '서울 특별시 강남구',
    subAddress: '역삼동',
    isDefault: true,
    amount: 13,
  };
  const addresses = await UserAddressRepository.getAddressesById(1);
  if (addresses.length > 0) return;
  await UserAddressRepository.createDefaultAddress(1, body);
}

async function createDefaultOrderList() {}

async function createDefaultPayment() {}
