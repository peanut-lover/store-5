import React from 'react';
import styled from 'styled-components';
import { FaChevronDown } from '@react-icons/all-files/fa/FaChevronDown';
import { FaChevronUp } from '@react-icons/all-files/fa/FaChevronUp';

interface Props {
  value: number;
  onChangeAmount: (value: number) => void;
}

const CartGoodsAmountInput: React.FC<Props> = ({ value, onChangeAmount }) => {
  return (
    <Wrapper>
      <Amount>{value}</Amount>
      <FlexRow>
        <Button
          onClick={() => {
            onChangeAmount(value + 1);
          }}
        >
          <FaChevronUp />
        </Button>
        <Button
          onClick={() => {
            onChangeAmount(value - 1);
          }}
        >
          <FaChevronDown />
        </Button>
      </FlexRow>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  border: 1px solid #ddd;
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  cursor: pointer;
  border: none;
  border-left: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  background-color: white;
  height: 1.5rem;

  :last-child {
    border-bottom: none;
  }
`;

const Amount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.5rem;
  height: 3rem;
`;

export default CartGoodsAmountInput;
