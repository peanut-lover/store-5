import React from 'react';
import styled from 'styled-components';
import CheckButton from 'src/components/CheckButton/CheckButton';
import { CartGoods } from 'src/types/CartGoods';
import { BiTrash } from 'react-icons/bi';
import CartGoodsAmountInput from './CartGoodsAmountInput/CartGoodsAmountInput';

const Wrapper = styled.div`
  padding: 1rem 0rem;
  display: flex;
  gap: 0.5rem;

  border-bottom: 1px dashed #ddd;
`;
const ThumbnailImg = styled.img`
  width: 8rem;
  height: 8rem;
`;
const GoodsTitle = styled.h2`
  flex: 1;
  padding: 0;
  margin: 0;
  font-size: 1.125rem;
  font-weight: normal;
`;
const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`;
const PriceText = styled.span`
  font-size: 1rem;
  font-weight: bolder;
`;

interface Props {
  cartGoods: CartGoods;
}

const CartGoodsListItem: React.FC<Props> = ({ cartGoods }) => {
  const { id, thumbnailUrl, title, price, discountRate, amount, isSelected } = cartGoods;

  return (
    <Wrapper>
      <CheckButton value={true} onClick={() => {}}></CheckButton>
      <ThumbnailImg src={thumbnailUrl} />
      <GoodsTitle>{title}</GoodsTitle>
      <FlexColumn>
        <BiTrash size='1.5rem' color='#ccc' />
        {/* 모달 */}
        <CartGoodsAmountInput />
        {/* 컴포넌트 분리하기 */}
        {/* TODO: fetch */}
        <PriceText>{price}원</PriceText>
        {/* TODO: discountRate를 적용하기 */}
      </FlexColumn>
    </Wrapper>
  );
};

export default CartGoodsListItem;
