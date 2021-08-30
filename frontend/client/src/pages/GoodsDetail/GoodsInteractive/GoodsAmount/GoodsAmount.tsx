import React, { useCallback } from 'react';
import styled from 'styled-components';
import RollingNumberMaker from '@src/components/RollingNumberMaker/RollingNumberMaker';
import { getDiscountedPrice, getPriceText } from '@src/utils/price';

import { FaAngleUp } from '@react-icons/all-files/fa/FaAngleUp';
import { FaAngleDown } from '@react-icons/all-files/fa/FaAngleDown';
import theme from '@src/theme/theme';

function getTotalPrice(amount: number, price: number, deliveryFee: number, discountRate: number) {
  if (amount === 0) return 0;
  return amount * getDiscountedPrice(price, discountRate) + deliveryFee;
}

function validateAndReplaceInput(value: string): string {
  value = value.replace(/[^\d]/g, '');
  return value;
}

interface Props {
  title: string;
  price: number;
  amount: number;
  deliveryFee: number;
  discountRate: number;
  isOver: boolean;
  setAmount: (amount: number) => void;
}

const GoodsAmount: React.FC<Props> = ({
  title,
  price,
  deliveryFee,
  discountRate,
  amount,
  isOver = false,
  setAmount,
}) => {
  const totalPrice = getTotalPrice(amount, price, deliveryFee, discountRate);

  const onPlusEvent = useCallback(() => {
    setAmount(amount + 1);
  }, [amount]);

  const onMinusEvent = useCallback(() => {
    setAmount(amount > 0 ? amount - 1 : 0);
  }, [amount]);

  const onChangeAmount = useCallback((e) => {
    const target = e.target;
    target.value = validateAndReplaceInput(target.value);
    setAmount(Number(target.value));
  }, []);

  return (
    <>
      <GoodsAmountContainer>
        <p>{title}</p>
        <HandleAmount>
          <Counter value={amount} onChange={onChangeAmount} />
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
            {/* <span>{getPriceText(totalPrice)}</span>원 */}
            {<RollingNumberMaker txt={getPriceText(totalPrice)} />}
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
  display: flex;
  position: relative;
  font-size: 1.875rem;
  color: #29c1bc;
  span {
    font-size: 2.25rem;
  }
`;

const OverStock = styled.div`
  font-size: 1.25rem;
  color: ${theme.warning};
`;

export default GoodsAmount;
