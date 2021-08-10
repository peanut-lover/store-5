import React from 'react';
import ProductItemList from 'src/components/ProductItemList/ProductItemList';
import ProductItem from 'src/components/ProductItem/ProductItem';
import { Product } from 'src/types/Product';
import styled from 'styled-components';

const mockImagePath =
  'https://user-images.githubusercontent.com/20085849/128866958-900ad32a-cd32-4b97-be79-1dbbc9dcb02d.jpeg';

const mock_products: Product[] = [
  { id: 1, img: mockImagePath, title: '맥쥬짠', price: 10000, isGreen: true, isBest: true },
  { id: 2, img: mockImagePath, title: '맥쥬짠', price: 10000, isNew: true },
  { id: 3, img: mockImagePath, title: '맥쥬짠', price: 10000, isSale: true },
  { id: 4, img: mockImagePath, title: '맥쥬짠', price: 10000 },
];

const Main = () => (
  <div>
    <h1> Main Page</h1>
    <MainContentContainer>
      <ProductItemList products={mock_products} />
    </MainContentContainer>
  </div>
);

const MainContentContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

export default Main;
