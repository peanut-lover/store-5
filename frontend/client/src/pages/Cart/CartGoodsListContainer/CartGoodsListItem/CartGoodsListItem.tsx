import React from 'react';
import { useCallback } from 'react';
import styled from 'styled-components';
import { FaTrashAlt } from '@react-icons/all-files/fa/FaTrashAlt';
import { CartGoods } from '@src/types/Goods';
import CheckButton from '@src/components/CheckButton/CheckButton';
import CartGoodsAmountInput from './CartGoodsAmountInput/CartGoodsAmountInput';
import ConfirmModal from '@src/components/ConfirmModal/ConfirmModal';
import { useState } from 'react';
import { getDiscountedPrice, getPriceText } from '@src/utils/price';

interface Props {
  cartGoods: CartGoods;
  onChangeAmount: (id: number, amount: number) => void;
  onDeleteCartGoods: (id: number) => void;
  onChangeIsSelected: (id: number, isSelected: boolean) => void;
}

// TODO: discountRate 관련 렌더링 추가하기
const CartGoodsListItem: React.FC<Props> = ({ cartGoods, onChangeAmount, onDeleteCartGoods, onChangeIsSelected }) => {
  const { id, goods, amount, isSelected } = cartGoods;
  const { thumbnailUrl, title, price, discountRate } = goods;

  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
  const toggleIsDeleteModalOpened = () => {
    setIsDeleteModalOpened(!isDeleteModalOpened);
  };

  const handleChangeAmount = useCallback(
    (amount: number) => {
      onChangeAmount(id, amount);
    },
    [onChangeAmount, id]
  );

  const handleDeleteCartGoods = useCallback(() => {
    onDeleteCartGoods(id);
  }, [onDeleteCartGoods, id]);

  const handleChangeIsSelected = useCallback(() => {
    onChangeIsSelected(id, !isSelected);
  }, [onChangeIsSelected, id, isSelected]);

  return (
    <Wrapper>
      <CheckButton isChecked={isSelected} onClick={handleChangeIsSelected} />
      <ThumbnailImg src={thumbnailUrl} />
      <GoodsTitle>{title}</GoodsTitle>
      <FlexColumn>
        <DeleteButton onClick={toggleIsDeleteModalOpened}>
          <FaTrashAlt size='1.5rem' color='#ccc' />
        </DeleteButton>
        {isDeleteModalOpened && (
          <ConfirmModal onConfirm={handleDeleteCartGoods} onCancel={toggleIsDeleteModalOpened}>
            <pre>해당 상품을{'\n'}삭제하시겠습니까?</pre>
          </ConfirmModal>
        )}
        <CartGoodsAmountInput value={amount} onChangeAmount={handleChangeAmount} />
        <PriceText>{getPriceText(getDiscountedPrice(price, discountRate) * amount)}원</PriceText>
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
