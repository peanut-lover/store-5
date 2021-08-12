import React from 'react';
import styled from 'styled-components';

interface Props {
  title: string;
  price: number;
  deliveryFee: number;
}

const GoodsPrice = ({ title, price, deliveryFee }: Props) => {
  const count = 1;
  const totalPrice = count * price;
  return (
    <>
      <GoodsPriceContainer>
        <p>{title}</p>
        <SelectCount>
          <Counter value={count} />
          <SelectCountButtons>
            <UpButton></UpButton>
            <DownButton></DownButton>
          </SelectCountButtons>
        </SelectCount>
        <Price>{price.toLocaleString()}원</Price>
      </GoodsPriceContainer>
      <TotalAmount>
        <span>총 합계금액</span>
        <TotalPrice>
          <span>{totalPrice.toLocaleString()}</span>원
        </TotalPrice>
      </TotalAmount>
    </>
  );
};

const GoodsPriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  margin-top: 2rem;
  background-color: #f5f5f5;
`;

const SelectCount = styled.div`
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

const SelectCountButtons = styled.div`
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
`;

const DownButton = styled.button`
  width: 100%;
  height: 50%;
  background: #fff;
  border: 0;
  cursor: pointer;
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

export default GoodsPrice;
