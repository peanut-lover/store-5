import React from 'react';
import styled from 'styled-components';

import { CartGoods } from 'src/types/CartGoods';
import CartGoodsListItem from './CartGoodsListItem/CartGoodsListItem';
import CheckButtonWithLabel from 'src/components/CheckButtonWithLabel/CheckButtonWithLabel';

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

interface Props {
  cartGoodsList: CartGoods[];
  onDeleteCartGoodsAll: (ids: number[]) => void;
  onChangeIsSelected: (id: number, isSelected: boolean) => void;
  onChangeAllIsSelected: (isSelected: boolean) => void;
  onChangeAmount: (id: number, amount: number) => void;
}

const CartGoodsListContainer: React.FC<Props> = ({
  cartGoodsList,
  onDeleteCartGoodsAll,
  onChangeIsSelected,
  onChangeAllIsSelected,
  onChangeAmount,
}) => {
  const selectedCartGoodsIds = cartGoodsList.filter(({ isSelected }) => isSelected).map(({ id }) => id);
  const isAllGoodsSelected = selectedCartGoodsIds.length === cartGoodsList.length;

  const handleChangeAmount = (id: number, amount: number) => {
    onChangeAmount(id, amount);
  };
  const handleDeleteCartGoods = (id: number) => {
    onDeleteCartGoodsAll([id]);
  };
  const handleDeleteSelectedCartGoods = () => {
    onDeleteCartGoodsAll(selectedCartGoodsIds);
  };
  const handleChangeIsSelected = (id: number, isSelected: boolean) => {
    onChangeIsSelected(id, isSelected);
  };
  const handleClickMasterCheckButton = () => {
    onChangeAllIsSelected(!isAllGoodsSelected);
  };

  return (
    <Wrapper>
      <StrongText>장바구니 상품 {cartGoodsList.length}개</StrongText>
      <FlexRow>
        <CheckButtonWithLabel
          label={isAllGoodsSelected ? '선택해제' : '전체선택'}
          value={isAllGoodsSelected}
          onClick={handleClickMasterCheckButton}
        ></CheckButtonWithLabel>
        <Button onClick={handleDeleteSelectedCartGoods}>상품삭제</Button>
        {/* TODO: 모달 */}
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

export default CartGoodsListContainer;
