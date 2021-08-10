import React from 'react';
import styled from 'styled-components';

interface Props {
  img?: string;
  title: string;
  price: number;
}

const ProductItem: React.FC<Props> = ({ img = '', title, price }) => {
  return (
    <ProductItemContainer>
      {img ? <ProductImage src={img} /> : <ProductEmptyImage />}
      <ProductTitle>{title}</ProductTitle>
      <ProductPrice>{price} 원</ProductPrice>
    </ProductItemContainer>
  );
};

const ProductItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const ProductEmptyImage = styled.div`
  width: 280px;
  height: 350px;
  background-color: #c0c0c0;
`;

const ProductImage = styled.img`
  width: 280px;
  height: 350px;
  object-fit: cover;
`;
const ProductTitle = styled.strong`
  font-size: 16px;
`;

const ProductPrice = styled.span`
  font-size: 16px;
`;

export default ProductItem;
