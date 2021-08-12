import { getDiscountedPrice } from '@src/utils/price';
import React, { useCallback } from 'react';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';
import styled from 'styled-components';

interface Props {
  title: string;
  price: number;
  amount: number;
  deliveryFee: number;
  discountRate: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
}

function getTotalPrice(amount: number, price: number, deliveryFee: number, discountRate: number) {
  if (amount === 0) return 0;
  return amount * getDiscountedPrice(price, discountRate) + deliveryFee;
}

const GoodsAmount = ({ title, price, deliveryFee, discountRate, amount, setAmount }: Props) => {
  const totalPrice = getTotalPrice(amount, price, deliveryFee, discountRate);

  const handleButtonEvent = useCallback((direction: number) => handleAmount(amount + direction), [amount]);

  const handleChangeEvent = useCallback(
    (target) => {
      target.value = target.value.replace(/[^\d]/g, '');
      target.value !== '' && handleAmount(Number(target.value));
    },
    [amount]
  );

  const handleAmount = (value: number) => {
    if (value < 0) value = 0;
    // TODO 재고확인 API 적용
    setAmount(value);
  };
  return (
    <>
      <GoodsAmountContainer>
        <p>{title}</p>
        <HandleAmount>
          <Counter value={amount} onChange={(e) => handleChangeEvent(e.target)} />
          <HandleAmountButtons>
            <UpButton onClick={() => handleButtonEvent(1)}>
              <FaAngleUp />
            </UpButton>
            <DownButton onClick={() => handleButtonEvent(-1)}>
              <FaAngleDown />
            </DownButton>
          </HandleAmountButtons>
        </HandleAmount>
        <Price>{getDiscountedPrice(price, discountRate).toLocaleString()}원</Price>
      </GoodsAmountContainer>
      <TotalAmount>
        <span>총 합계금액</span>
        <TotalPrice>
          <span>{totalPrice.toLocaleString()}</span>원
        </TotalPrice>
      </TotalAmount>
    </>
  );
};

const GoodsAmountContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  margin-top: 2rem;
  background-color: #f5f5f5;
`;

const HandleAmount = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
`;

const Counter = styled.input.attrs({ type: 'text' })`
  width: 2.75rem;
  height: 2rem;
  text-align: center;
  border: 0;
  border-right: 1px solid #ccc;
`;

const HandleAmountButtons = styled.div`
  height: 2rem;
  width: 1rem;
`;

const UpButton = styled.button`
  width: 100%;
  height: 50%;
  background: #fff;
  border: 0;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  padding: 0;
`;

const DownButton = styled.button`
  width: 100%;
  height: 50%;
  background: #fff;
  border: 0;
  cursor: pointer;
  padding: 0;
`;

const Price = styled.div`
  font-weight: 600;
`;

const TotalAmount = styled.div`
  margin-top: 4rem;
  padding: 1.5rem 0;
  display: flex;
  font-family: 'Montserrat';
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  height: 100px;
  border-top: 1px solid #dbdbdb;
  & > span {
    font-size: 1rem;
    color: #717171;
  }
`;

const TotalPrice = styled.div`
  font-size: 1.875rem;
  color: #29c1bc;
  span {
    font-size: 2.25rem;
  }
`;

export default GoodsAmount;
