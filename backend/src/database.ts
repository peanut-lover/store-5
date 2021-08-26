import { createConnection, getRepository, IsNull, Like, Not } from 'typeorm';
import { DeliveryInfoRepository } from './repository/delivery.info.repository';
import { databaseConfig } from './config';
import { DeliveryInfo } from './entity/DeliveryInfo';
import { Cart } from './entity/Cart';
import { Category } from './entity/Category';
import { Goods } from './entity/Goods';
import { GoodsImg } from './entity/GoodsImg';
import { OrderItem } from './entity/OrderItem';
import { Order } from './entity/Order';
import { Payment } from './entity/Payment';
import { Promotion } from './entity/Promotion';
import { User } from './entity/User';
import { UserAddress } from './entity/UserAddress';
import { Wish } from './entity/Wish';
import { CategoryRepository } from './repository/category.repository';
import { UserRepository } from './repository/user.repository';
import { UserAddressRepository } from './repository/user.address.repository';
import { GoodsStateMap } from './service/goods.service';
import { PromotionRepository } from './repository/promotion.repository';
import { PaymentRepository } from './repository/payment.repository';
import { Review } from './entity/Review';
import { ReviewImg } from './entity/ReviewImg';

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
      Order,
      Goods,
      GoodsImg,
      Category,
      Payment,
      Promotion,
      Wish,
      Review,
      ReviewImg,
    ], // TODO: add entities
  });
  await populate();
}

async function populate() {
  await createDefaultUser('배달의 민족');
  await createDefaultAddress();
  await createDefaultCategory();
  await createDefaultDeliveryInfo();
  await createDefaultGoods();
  await createDefaultPromotions();
  await createDefaultPayment();
}

async function createDefaultUser(name: string) {
  const result = await UserRepository.findByGitHubId('1');
  if (!result) {
    await UserRepository.create(
      '1',
      name,
      'https://user-images.githubusercontent.com/20085849/130751828-440dcec8-5619-41f3-9b2d-e0c73056c375.png'
    );
  }
}

async function createDefaultCategory() {
  const categories = [
    { name: '문구' },
    { parent: '문구', name: '노트' },
    { parent: '문구', name: '필기구' },
    { parent: '문구', name: '기타' },
    { name: '가구' },
    { parent: '가구', name: '일반' },
    { parent: '가구', name: '주방' },
    { parent: '가구', name: '수납' },
    { name: '도서' },
    { parent: '도서', name: '과학' },
    { parent: '도서', name: '건강' },
    { parent: '도서', name: '요리' },
    { parent: '도서', name: '인문' },
    { name: '코로나' },
    { parent: '코로나', name: '조심세트' },
    { parent: '코로나', name: '극복세트' },
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

async function createDefaultDeliveryInfo() {
  const res = await DeliveryInfoRepository.getDeliveryInfos();
  if (res.length > 0) return;
  await DeliveryInfoRepository.createDeliveryInfo({
    name: '산간',
    deliveryFee: 5000,
    deliveryDetail: '배송 지역이 너무멀어요',
  });
}

async function createDefaultPayment() {
  const res = await PaymentRepository.getPayments();
  if (res.length > 0) return;
  await PaymentRepository.createPayment('우아한 페이', '현금');
  await PaymentRepository.createPayment('네이버 페이', '신용카드');
  await PaymentRepository.createPayment('카카오 페이', '신용카드');
  await PaymentRepository.createPayment('신용카드', '신용카드');
}

async function createDefaultGoods() {
  const childCategories = await getRepository(Category).find({ select: ['id'], where: { parent: Not(IsNull()) } });
  const childIds = childCategories.map((category) => category.id);
  const DUMMY_LENGTH = 30;
  const goodsList = createDummy(DUMMY_LENGTH, childIds);
  const skip = await getRepository(Goods).find({ where: { title: Like('%상품명 랜덤%') } });
  if (skip.length >= DUMMY_LENGTH) return;
  for (const goods of goodsList) {
    const { thumbnailUrl, countOfSell, isGreen, title, price, stock, discountRate, state, category, delivery } = goods;
    const newGoods = await getRepository(Goods).save({
      thumbnailUrl,
      title,
      price,
      stock,
      discountRate,
      state,
      isGreen,
      category: {
        id: category,
      },
      deliveryInfo: {
        id: delivery,
      },
      countOfSell,
      view: Math.random() * 100,
    });
    await getRepository(GoodsImg).save({ goods: { id: newGoods.id }, url: goods.thumbnailUrl });
    console.log(`초기 상품 데이터 삽입 : name - ${newGoods.title}, id - ${newGoods.id}`);
  }
}

function createDummy(length: number, ids: number[]) {
  const THUMBNAIL_URLS = [
    'https://user-images.githubusercontent.com/20085849/128866958-900ad32a-cd32-4b97-be79-1dbbc9dcb02d.jpeg',
    'https://user-images.githubusercontent.com/45394360/129675520-751e7b2a-0d8c-48dd-b737-dcfcad3c91ca.jpg',
    'https://user-images.githubusercontent.com/45394360/129675522-0223efb9-8229-4639-943e-b23b524954e9.jpg',
    'https://user-images.githubusercontent.com/45394360/129675523-355ce30a-fe04-458f-8de0-a29991be3b36.jpg',
    'https://user-images.githubusercontent.com/45394360/129675525-d45554e9-b9a9-43f3-90de-1ca636f16e4e.jpg',
    'https://user-images.githubusercontent.com/45394360/129675528-80e08a25-5ff8-4510-9fb6-ef450ac23922.png',
    'https://user-images.githubusercontent.com/45394360/129675529-f90e2e73-222b-4815-9495-98e4b1647cb9.png',
    'https://user-images.githubusercontent.com/45394360/129675531-1b643050-5565-457f-a039-289d47fb3507.jpg',
    'https://user-images.githubusercontent.com/45394360/129675532-6502598c-3c55-4275-b7db-2e78f1adcfcb.png',
    'https://user-images.githubusercontent.com/45394360/129675533-4623cae5-461c-4f9a-91bd-1ffd13e0d952.jpg',
    'https://user-images.githubusercontent.com/45394360/129675534-460d3843-9e25-43f3-ac66-43ccc55413d3.png',
    'https://user-images.githubusercontent.com/45394360/129675535-e4c8f4cd-a1de-44a6-b3b5-92d4edb58cda.png',
    'https://user-images.githubusercontent.com/45394360/129675537-7c4e1d7d-6477-4dee-bd2d-2d0aeb30f7c7.png',
    'https://user-images.githubusercontent.com/45394360/129675539-001126ce-f551-4180-8259-21b5950c0117.jpg',
    'https://user-images.githubusercontent.com/45394360/129675543-ca18f56d-b39f-4444-b581-fa1df49f0f1c.jpg',
    'https://user-images.githubusercontent.com/45394360/129676346-46cd54dc-d557-42bd-8eba-5f65660b0550.png',
    'https://user-images.githubusercontent.com/45394360/129676351-5a2ef39f-7f35-4f35-81f0-f1aef92c9d78.png',
    'https://user-images.githubusercontent.com/45394360/129676353-48760f6f-4008-4c9e-84f8-73b8fb2b47af.png',
    'https://user-images.githubusercontent.com/45394360/129676354-1fcde62d-7e8a-4f2f-961c-93caaaccdff4.jpg',
    'https://user-images.githubusercontent.com/45394360/129676355-15c47cee-5afe-4f17-9a0d-2ebb932a8b46.jpg',
  ];
  // 더미 데이터 관련 상수
  const TITLE_SUFFIX = 10000;
  const MIN_PRICE = 1000;
  const MAX_PRICE = 100000;
  const result = Array(length)
    .fill('')
    .map((_) => {
      return {
        thumbnailUrl: THUMBNAIL_URLS[Math.floor(Math.random() * THUMBNAIL_URLS.length)],
        countOfSell: Math.floor(Math.random() * 100 + 1),
        isGreen: !Math.round(Math.random()),
        title: `상품명 랜덤 - ${Math.floor(Math.random() * TITLE_SUFFIX)}`,
        price: (Math.floor(Math.random() * MAX_PRICE) / 10) * 10 + MIN_PRICE,
        stock: 1 * Math.round(Math.random() * 50),
        discountRate: Math.floor(Math.random() * 50),
        state: GoodsStateMap.sale,
        category: ids[Math.floor(Math.random() * ids.length)],
        delivery: 1,
      };
    });
  return result;
}

async function createDefaultPromotions() {
  const examplePromotionImgs = [
    'https://user-images.githubusercontent.com/20085849/128992411-3b983b09-b0af-408a-bf56-4bde93c4b543.gif',
    'https://user-images.githubusercontent.com/20085849/128992519-06368afd-3f31-459d-9050-101e730e304d.gif',
    'https://user-images.githubusercontent.com/20085849/128992450-eb086cff-3b2a-4d4a-8b01-e3a8a8eaa754.gif',
  ];
  const promotion = await PromotionRepository.getPromotions();
  const randomGoods = await getRepository(Goods).findOne();
  if (!randomGoods) {
    console.log('상품이 없어서 프로모션을 추가 못했습니다.');
    return;
  }
  for (const img of examplePromotionImgs) {
    const exist = promotion.find((p) => p.imgUrl === img);
    if (!exist) {
      const newPromotion = await PromotionRepository.createPromotion(randomGoods.id, img);
      console.log('프로모션 생성 : id' + randomGoods.id + 'url :' + newPromotion.imgUrl);
    }
  }
}
