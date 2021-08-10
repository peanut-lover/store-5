import React from 'react';
import ProductItemList from 'src/components/ProductItemList/ProductItemList';
import { Product } from 'src/types/Product';
import styled from 'styled-components';
import ProductSection from 'src/components/ProductSection/ProductSection';

const mockImagePath =
  'https://user-images.githubusercontent.com/20085849/128866958-900ad32a-cd32-4b97-be79-1dbbc9dcb02d.jpeg';

const mock_best_products: Product[] = [
  { id: 1, img: mockImagePath, title: '맥쥬짠', price: 10000, isGreen: true, isBest: true },
  { id: 2, img: mockImagePath, title: '맥쥬짠', price: 10000, isNew: true },
  { id: 3, img: mockImagePath, title: '맥쥬짠', price: 10000, isSale: true, discountRate: 20 },
  { id: 4, img: mockImagePath, title: '맥쥬짠', price: 10000 },
];

const mock_new_products: Product[] = [
  { id: 1, img: mockImagePath, title: '맥쥬짠', price: 10000, isNew: true, isGreen: true, isBest: true },
  { id: 2, img: mockImagePath, title: '맥쥬짠', price: 10000, isNew: true, isSale: true, discountRate: 20 },
  { id: 3, img: mockImagePath, title: '맥쥬짠', price: 10000, isNew: true, isSale: true, discountRate: 20 },
  { id: 4, img: mockImagePath, title: '맥쥬짠', price: 10000, isNew: true },
  { id: 5, img: mockImagePath, title: '맥쥬짠', price: 10000, isNew: true },
  { id: 6, img: mockImagePath, title: '맥쥬짠', price: 10000, isNew: true },
  { id: 7, img: mockImagePath, title: '맥쥬짠', price: 10000, isNew: true },
  { id: 8, img: mockImagePath, title: '맥쥬짠', price: 10000, isNew: true },
];

const Main = () => (
  <div>
    <MainContentContainer>
      <ProductSection sectionTitle='잘나가요' products={mock_best_products} />
      <ProductSection sectionTitle='새로 나왔어요' products={mock_new_products} />
    </MainContentContainer>
  </div>
);

const MainContentContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

export default Main;
