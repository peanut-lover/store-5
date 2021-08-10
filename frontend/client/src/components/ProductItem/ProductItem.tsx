import React from 'react';
import styled from 'styled-components';
import { BestTag, GreenTag, NewTag, SaleTag } from '../Tag';

interface Props {
  img?: string;
  title: string;
  price: number;
  isBest?: boolean;
  isGreen?: boolean;
  isNew?: boolean;
  isSale?: boolean;
}

const ProductItem: React.FC<Props> = ({
  img = '',
  title,
  price,
  isBest = false,
  isNew = false,
  isGreen = false,
  isSale = false,
}) => {
  return (
    <ProductItemContainer>
      <TagContainer>
        {isBest && <BestTag />}
        {isGreen && <GreenTag />}
        {isNew && <NewTag />}
        {isSale && <SaleTag />}
      </TagContainer>
      {img ? <ProductImage src={img} /> : <ProductEmptyImage />}
      <ProductTitle>{title}</ProductTitle>
      <ProductPrice>{price} 원</ProductPrice>
    </ProductItemContainer>
  );
};

const TagContainer = styled.div`
  position: absolute;
  display: flex;
  left: 0;
  top: 0;
  padding: 5px;
  width: 100%;
  height: 25px;
  & > *:not(:last-child) {
    margin-right: 3px;
  }
`;

const ProductItemContainer = styled.div`
  position: relative;
  flex-grow: 0;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
`;

const ProductEmptyImage = styled.div`
  width: 280px;
  height: 350px;
  background-color: #c0c0c0; // TODO: change const color
`;

const ProductImage = styled.img`
  width: 280px;
  height: 350px;
  object-fit: cover;
`;
const ProductTitle = styled.strong`
  margin-top: 10px;
  font-size: 16px;
`;

const ProductPrice = styled.span`
  margin-top: 5px;
  font-size: 16px;
`;

export default ProductItem;
