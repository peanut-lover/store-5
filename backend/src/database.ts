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
import CategoryRepository from './repository/category.repository';
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

  const categories = [
    { name: 'A' },
    { parent: 'A', name: 'A1' },
    { parent: 'A', name: 'A2' },
    { parent: 'A', name: 'A3' },
    { name: 'B' },
    { parent: 'B', name: 'B1' },
    { parent: 'B', name: 'B2' },
  ];
  for (const category of categories) {
    await createCategory(category.name, category.parent);
  }
}

async function createDefaultUser(name: string) {
  const result = await UserRepository.findByGitHubId('1');
  if (!result) {
    await UserRepository.create(name, '1');
  }
}

async function createCategory(name: string, parentCategoryName?: string) {
  if (parentCategoryName) {
    const parent = await CategoryRepository.getCategoryByName(parentCategoryName);
    if (!parent) {
      throw Error(
        '존재하지않는 부모 카테고리를 가진 데이터를 넣을 수 없습니다. parentCategory Name: ' + parentCategoryName
      );
    }
    const originCategory = await CategoryRepository.getCategoryByName(name);
    if (!originCategory) {
      const newCategory = await CategoryRepository.createSubCategory(name, parent.id);
      console.log(`초기 카테고리 데이터 삽입 : name - ${newCategory.name}, parent - ${parent.name}`);
    }
  } else {
    const originCategory = await CategoryRepository.getCategoryByName(name);
    if (!originCategory) {
      const newCategory = await CategoryRepository.createCategory(name);
      console.log(`초기 카테고리 데이터 삽입 : name - ${newCategory.name}`);
    }
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
