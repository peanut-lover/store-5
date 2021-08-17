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
import { PromotionRepository } from './repository/promotion.repository';

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
  await createDefaultCategory();
  await createDefaultPromotions();
}

async function createDefaultUser(name: string) {
  const result = await UserRepository.findByGitHubId('1');
  if (!result) {
    await UserRepository.create('1', name);
  }
}

async function createDefaultCategory() {
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

async function createDefaultPromotions() {
  const examplePromotionImgs = [
    'https://user-images.githubusercontent.com/20085849/128992411-3b983b09-b0af-408a-bf56-4bde93c4b543.gif',
    'https://user-images.githubusercontent.com/20085849/128992519-06368afd-3f31-459d-9050-101e730e304d.gif',
    'https://user-images.githubusercontent.com/20085849/128992450-eb086cff-3b2a-4d4a-8b01-e3a8a8eaa754.gif',
  ];
  const promotion = await PromotionRepository.getPromotions();

  for (const img of examplePromotionImgs) {
    const exist = promotion.find((p) => p.imgUrl === img);
    if (!exist) {
      const newPromotion = await PromotionRepository.createPromotion(img);
      console.log('프로모션 생성 :' + newPromotion.imgUrl);
    }
  }
}
