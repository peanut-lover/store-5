import React, { useReducer } from 'react';
import { styled } from '@src/lib/CustomStyledComponent';
import GoodsTableRow from './GoodsTableRow/GoodsTableRow';
import { GoodsItem } from '@src/types/Goods';

// function

const GoodsTable = () => {
  //   // const tmp = useReducer(reduce, state);
  return (
    <GoodsTableContainer>
      {goodsList.map((goods) => (
        <GoodsTableRow goods={goods} />
      ))}
    </GoodsTableContainer>
  );
};

const GoodsTableContainer = styled('table')``;

export default GoodsTable;

const goodsList: GoodsItem[] = [
  {
    id: 20,
    thumbnailUrl:
      'https://user-images.githubusercontent.com/45394360/129675529-f90e2e73-222b-4815-9495-98e4b1647cb9.png',
    title: '상품명 랜덤 - 793',
    price: 91226,
    stock: 11,
    discountRate: 44,
    countOfSell: 47,
    state: 'S',
    isGreen: false,
    category: {
      name: '이름',
      id: 1,
    },
    createdAt: '2021-08-17T08:34:00.090Z',
    updatedAt: '2021-08-17T08:34:00.090Z',
    deliveryInfo: 1,
  },
  {
    id: 19,
    thumbnailUrl:
      'https://user-images.githubusercontent.com/45394360/129675543-ca18f56d-b39f-4444-b581-fa1df49f0f1c.jpg',
    title: '상품명 랜덤 - 7511',
    price: 27177,
    stock: 19,
    discountRate: 10,
    countOfSell: 94,
    state: 'S',
    isGreen: false,
    category: {
      name: '이름',
      id: 1,
    },
    createdAt: '2021-08-17T08:34:00.085Z',
    updatedAt: '2021-08-17T08:34:00.085Z',
    deliveryInfo: 1,
  },
  {
    id: 18,
    thumbnailUrl:
      'https://user-images.githubusercontent.com/45394360/129676354-1fcde62d-7e8a-4f2f-961c-93caaaccdff4.jpg',
    title: '상품명 랜덤 - 4314',
    price: 70659,
    stock: 40,
    discountRate: 43,
    countOfSell: 68,
    state: 'S',
    isGreen: true,
    category: {
      name: '이름',
      id: 1,
    },
    createdAt: '2021-08-17T08:34:00.080Z',
    updatedAt: '2021-08-17T08:34:00.080Z',
    deliveryInfo: 1,
  },
  {
    id: 17,
    thumbnailUrl:
      'https://user-images.githubusercontent.com/45394360/129675539-001126ce-f551-4180-8259-21b5950c0117.jpg',
    title: '상품명 랜덤 - 9680',
    price: 83762,
    stock: 19,
    discountRate: 31,
    countOfSell: 25,
    state: 'S',
    isGreen: false,
    category: {
      name: '이름',
      id: 1,
    },
    createdAt: '2021-08-17T08:34:00.076Z',
    updatedAt: '2021-08-17T08:34:00.076Z',
    deliveryInfo: 1,
  },
  {
    id: 16,
    thumbnailUrl:
      'https://user-images.githubusercontent.com/45394360/129675534-460d3843-9e25-43f3-ac66-43ccc55413d3.png',
    title: '상품명 랜덤 - 8466',
    price: 3637,
    stock: 7,
    discountRate: 0,
    countOfSell: 61,
    state: 'S',
    isGreen: true,
    category: {
      name: '이름',
      id: 1,
    },
    createdAt: '2021-08-17T08:34:00.070Z',
    updatedAt: '2021-08-17T08:34:00.070Z',
    deliveryInfo: 1,
  },
  {
    id: 20,
    thumbnailUrl:
      'https://user-images.githubusercontent.com/45394360/129675529-f90e2e73-222b-4815-9495-98e4b1647cb9.png',
    title: '상품명 랜덤 - 793',
    price: 91226,
    stock: 11,
    discountRate: 44,
    countOfSell: 47,
    state: 'S',
    isGreen: false,
    category: {
      name: '이름',
      id: 1,
    },
    createdAt: '2021-08-17T08:34:00.090Z',
    updatedAt: '2021-08-17T08:34:00.090Z',
    deliveryInfo: 1,
  },
  {
    id: 19,
    thumbnailUrl:
      'https://user-images.githubusercontent.com/45394360/129675543-ca18f56d-b39f-4444-b581-fa1df49f0f1c.jpg',
    title: '상품명 랜덤 - 7511',
    price: 27177,
    stock: 19,
    discountRate: 10,
    countOfSell: 94,
    state: 'S',
    isGreen: false,
    category: {
      name: '이름',
      id: 1,
    },
    createdAt: '2021-08-17T08:34:00.085Z',
    updatedAt: '2021-08-17T08:34:00.085Z',
    deliveryInfo: 1,
  },
  {
    id: 18,
    thumbnailUrl:
      'https://user-images.githubusercontent.com/45394360/129676354-1fcde62d-7e8a-4f2f-961c-93caaaccdff4.jpg',
    title: '상품명 랜덤 - 4314',
    price: 70659,
    stock: 40,
    discountRate: 43,
    countOfSell: 68,
    state: 'S',
    isGreen: true,
    category: {
      name: '이름',
      id: 1,
    },
    createdAt: '2021-08-17T08:34:00.080Z',
    updatedAt: '2021-08-17T08:34:00.080Z',
    deliveryInfo: 1,
  },
  {
    id: 17,
    thumbnailUrl:
      'https://user-images.githubusercontent.com/45394360/129675539-001126ce-f551-4180-8259-21b5950c0117.jpg',
    title: '상품명 랜덤 - 9680',
    price: 83762,
    stock: 19,
    discountRate: 31,
    countOfSell: 25,
    state: 'S',
    isGreen: false,
    category: {
      name: '이름',
      id: 1,
    },
    createdAt: '2021-08-17T08:34:00.076Z',
    updatedAt: '2021-08-17T08:34:00.076Z',
    deliveryInfo: 1,
  },
  {
    id: 16,
    thumbnailUrl:
      'https://user-images.githubusercontent.com/45394360/129675534-460d3843-9e25-43f3-ac66-43ccc55413d3.png',
    title: '상품명 랜덤 - 8466',
    price: 3637,
    stock: 7,
    discountRate: 0,
    countOfSell: 61,
    state: 'S',
    isGreen: true,
    category: {
      name: '이름',
      id: 1,
    },
    createdAt: '2021-08-17T08:34:00.070Z',
    updatedAt: '2021-08-17T08:34:00.070Z',
    deliveryInfo: 1,
  },
];
