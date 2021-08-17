import theme from '@src/theme/theme';
import { getDiscountedPrice, getPriceText } from '@src/utils/price';
import React, { useCallback } from 'react';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';
import styled from 'styled-components';

function getTotalPrice(amount: number, price: number, deliveryFee: number, discountRate: number) {
  if (amount === 0) return 0;
  return amount * getDiscountedPrice(price, discountRate) + deliveryFee;
}

interface Props {
  title: string;
  price: number;
  amount: number;
  deliveryFee: number;
  discountRate: number;
  isOver: boolean;
  onChangeAmount: (amount: number) => void;
}

const GoodsAmount: React.FC<Props> = ({
  title,
  price,
  deliveryFee,
  discountRate,
  amount,
  isOver = false,
  onChangeAmount,
}) => {
  const totalPrice = getTotalPrice(amount, price, deliveryFee, discountRate);

  const onPlusEvent = useCallback(() => {
    handleAmount(amount + 1);
  }, [amount]);

  const onMinusEvent = useCallback(() => {
    handleAmount(amount - 1);
  }, [amount]);

  const handleChangeEvent = useCallback((e) => {
    const target = e.target;
    target.value = target.value.replace(/[^\d]/g, '');
    target.value !== '' && handleAmount(Number(target.value));
  }, []);

  const handleAmount = (value: number) => {
    if (value < 0) value = 0;
    onChangeAmount(value);
  };
  return (
    <>
      <GoodsAmountContainer>
        <p>{title}</p>
        <HandleAmount>
          <Counter value={amount} onChange={handleChangeEvent} />
          <HandleAmountButtons>
            <UpButton onClick={onPlusEvent}>
              <FaAngleUp />
            </UpButton>
            <DownButton onClick={onMinusEvent}>
              <FaAngleDown />
            </DownButton>
          </HandleAmountButtons>
        </HandleAmount>
        <Price>{getPriceText(getDiscountedPrice(price, discountRate))}원</Price>
      </GoodsAmountContainer>
      <TotalAmount>
        <span>총 합계금액</span>
        {isOver ? (
          <OverStock>구매 가능 수량 초과</OverStock>
        ) : (
          <TotalPrice>
            <span>{getPriceText(totalPrice)}</span>원
          </TotalPrice>
        )}
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

const OverStock = styled.div`
  font-size: 1.875rem;
  color: ${theme.warning};
`;

export default GoodsAmount;
