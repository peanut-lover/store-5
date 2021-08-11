import React from 'react';
import styled from 'styled-components';
import { Goods } from 'src/types/Goods';
import GoodsSection from 'src/components/GoodsSection/GoodsSection';

const mockImagePath =
  'https://user-images.githubusercontent.com/20085849/128866958-900ad32a-cd32-4b97-be79-1dbbc9dcb02d.jpeg';

const mock_best_products: Goods[] = [
  { id: 1, thumbnailImg: mockImagePath, title: '맥쥬짠', price: 10000, isGreen: true, isBest: true },
  { id: 2, thumbnailImg: mockImagePath, title: '맥쥬짠', price: 10000, isNew: true },
  { id: 3, title: 'NoImage 맥쥬짠', price: 10000, isSale: true, discountRate: 20 },
  { id: 4, thumbnailImg: mockImagePath, title: '맥쥬짠', price: 10000 },
];

const mock_new_products: Goods[] = [
  { id: 1, thumbnailImg: mockImagePath, title: '맥쥬짠', price: 10000, isNew: true, isGreen: true, isBest: true },
  { id: 2, thumbnailImg: mockImagePath, title: '맥쥬짠', price: 10000, isNew: true, isSale: true, discountRate: 20 },
  { id: 3, thumbnailImg: mockImagePath, title: '맥쥬짠', price: 10000, isNew: true, isSale: true, discountRate: 20 },
  { id: 4, thumbnailImg: mockImagePath, title: '맥쥬짠', price: 10000, isNew: true },
  { id: 5, thumbnailImg: mockImagePath, title: '맥쥬짠', price: 10000, isNew: true },
  { id: 6, thumbnailImg: mockImagePath, title: '맥쥬짠', price: 10000, isNew: true },
  { id: 7, thumbnailImg: mockImagePath, title: '맥쥬짠', price: 10000, isNew: true },
  { id: 8, thumbnailImg: mockImagePath, title: '맥쥬짠', price: 10000, isNew: true },
];

const Main = () => (
  <div>
    <MainContentContainer>
      <GoodsSection sectionTitle='잘나가요' goodsList={mock_best_products} />
      <GoodsSection sectionTitle='새로 나왔어요' goodsList={mock_new_products} />
    </MainContentContainer>
  </div>
);

const MainContentContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

export default Main;
