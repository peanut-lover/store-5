import React from 'react';
import styled from 'styled-components';
import { BiTrash } from 'react-icons/bi';
import { CartGoods } from '@src/types/CartGoods';
import CheckButton from '@src/components/CheckButton/CheckButton';
import CartGoodsAmountInput from './CartGoodsAmountInput/CartGoodsAmountInput';

interface Props {
  cartGoods: CartGoods;
  onChangeAmount: (id: number, amount: number) => void;
  onDeleteCartGoods: (id: number) => void;
  onChangeIsSelected: (id: number, isSelected: boolean) => void;
}

const CartGoodsListItem: React.FC<Props> = ({ cartGoods, onChangeAmount, onDeleteCartGoods, onChangeIsSelected }) => {
  const { id, thumbnailUrl, title, price, discountRate, amount, isSelected } = cartGoods;

  const handleChangeAmount = (amount: number) => {
    onChangeAmount(id, amount);
  };

  const handleDeleteCartGoods = () => {
    onDeleteCartGoods(id);
  };

  const handleChangeIsSelected = () => {
    onChangeIsSelected(id, !isSelected);
  };

  return (
    <Wrapper>
      <CheckButton value={isSelected} onClick={handleChangeIsSelected} />
      <ThumbnailImg src={thumbnailUrl} />
      <GoodsTitle>{title}</GoodsTitle>
      <FlexColumn>
        <DeleteButton onClick={handleDeleteCartGoods}>
          <BiTrash size='1.5rem' color='#ccc' />
        </DeleteButton>
        {/* TODO: 모달 */}
        <CartGoodsAmountInput value={amount} onChangeAmount={handleChangeAmount} />
        <PriceText>{price * amount}원</PriceText>
      </FlexColumn>
    </Wrapper>
  );
};

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
const DeleteButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
`;

export default CartGoodsListItem;
