import React, { useMemo, useCallback } from 'react';
import styled from 'styled-components';

import { CartGoods } from '@src/types/Goods';
import CheckButtonWithLabel from '@src/components/CheckButtonWithLabel/CheckButtonWithLabel';
import CartGoodsListItem from './CartGoodsListItem/CartGoodsListItem';
import { useState } from 'react';
import ConfirmModal from '@src/components/ConfirmModal/ConfirmModal';

const LABEL_TEXT_CLEAR_ALL = '선택해제';
const LABEL_TEXT_SELECT_ALL = '전체선택';

interface Props {
  cartGoodsList: CartGoods[];
  onDeleteCartGoodsAll: (ids: number[]) => void;
  onChangeIsSelected: (id: number, isSelected: boolean) => void;
  onReviseIsSelected: (isSelected: boolean) => void;
  onChangeAmount: (id: number, amount: number) => void;
}

const CartGoodsListContainer: React.FC<Props> = ({
  cartGoodsList,
  onDeleteCartGoodsAll,
  onChangeIsSelected,
  onReviseIsSelected,
  onChangeAmount,
}) => {
  const selectedCartGoodsIds = useMemo(
    () => cartGoodsList.filter(({ isSelected }) => isSelected).map(({ id }) => id),
    [cartGoodsList]
  );
  const isAllGoodsSelected = selectedCartGoodsIds.length === cartGoodsList.length;

  const handleChangeAmount = useCallback(
    (id: number, amount: number) => {
      onChangeAmount(id, amount);
    },
    [onChangeAmount]
  );

  const handleDeleteCartGoods = useCallback(
    (id: number) => {
      onDeleteCartGoodsAll([id]);
    },
    [onDeleteCartGoodsAll]
  );

  const handleDeleteSelectedCartGoods = useCallback(() => {
    onDeleteCartGoodsAll(selectedCartGoodsIds);
  }, [onDeleteCartGoodsAll, selectedCartGoodsIds]);

  const handleChangeIsSelected = useCallback(
    (id: number, isSelected: boolean) => {
      onChangeIsSelected(id, isSelected);
    },
    [onChangeIsSelected]
  );

  const handleClickMasterCheckButton = useCallback(() => {
    onReviseIsSelected(!isAllGoodsSelected);
  }, [onReviseIsSelected, isAllGoodsSelected]);

  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
  const toggleIsDeleteModalOpened = () => {
    setIsDeleteModalOpened(!isDeleteModalOpened);
  };

  return (
    <Wrapper>
      <StrongText>장바구니 상품 {cartGoodsList.length}개</StrongText>
      <FlexRow>
        <CheckButtonWithLabel
          label={isAllGoodsSelected ? LABEL_TEXT_CLEAR_ALL : LABEL_TEXT_SELECT_ALL}
          isChecked={isAllGoodsSelected}
          onClick={handleClickMasterCheckButton}
        ></CheckButtonWithLabel>
        <Button disabled={selectedCartGoodsIds.length === 0} onClick={toggleIsDeleteModalOpened}>
          상품삭제
        </Button>
        {isDeleteModalOpened && (
          <ConfirmModal onConfirm={handleDeleteSelectedCartGoods} onCancel={toggleIsDeleteModalOpened}>
            <pre>
              선택한 {selectedCartGoodsIds.length}개의 상품을{'\n'}삭제하시겠습니까?
            </pre>
          </ConfirmModal>
        )}
      </FlexRow>
      <Divider />
      <div>
        {cartGoodsList.map((cartGoods) => (
          <CartGoodsListItem
            key={cartGoods.id}
            cartGoods={cartGoods}
            onChangeAmount={handleChangeAmount}
            onChangeIsSelected={handleChangeIsSelected}
            onDeleteCartGoods={handleDeleteCartGoods}
          />
        ))}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

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

export default CartGoodsListContainer;
