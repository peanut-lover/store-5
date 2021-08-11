import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

import { CartGoods } from 'src/types/CartGoods';
import CartGoodsListItem from './CartGoodsListItem/CartGoodsListItem';
import CheckButtonWithLabel from 'src/components/CheckButtonWithLabel/CheckButtonWithLabel';

interface Props {
  cartGoodsList: CartGoods[];
}

const StrongText = styled.h2`
  margin: 0;
  padding: 0;
  color: black;
  font-size: 1.25rem;
  font-weight: bolder;

  margin-bottom: 1rem;
`;

const Button = styled.button`
  cursor: pointer;
  border: 1px solid #ddd;
  color: black;
  background-color: white;
  margin: 0;
  padding: 0.5rem 1rem;
  font-size: 1.125rem;
  font-weight: bolder;

  transition: 0.2s linear;

  :hover {
    border: 1px solid black;
  }

  :disabled {
    cursor: initial;
    border: 1px solid #ddd;
    color: #ddd;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 4rem;
  margin-bottom: 4rem;
`;

const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Divider = styled.hr`
  height: 2px;
  border: none;
  width: 100%;
  background-color: #ddd;
`;

// 전체 선택
// 상품삭제(모달)
const CartGoodsListContainer: React.FC<Props> = ({ cartGoodsList }) => {
  const [value, setValue] = useState(true);

  return (
    <Wrapper>
      <StrongText>장바구니 상품 {cartGoodsList.length}개</StrongText>
      <FlexRow>
        <CheckButtonWithLabel
          label={value ? '선택해제' : '전체선택'}
          value={value}
          onClick={() => {
            setValue(!value);
          }}
        ></CheckButtonWithLabel>
        <Button>상품삭제</Button>
      </FlexRow>
      <Divider />
      <div>
        {cartGoodsList.map((cartGoods) => (
          <CartGoodsListItem key={cartGoods.id} cartGoods={cartGoods} />
        ))}
      </div>
    </Wrapper>
  );
};

export default CartGoodsListContainer;
