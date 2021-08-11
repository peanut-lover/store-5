import React from 'react';
import styled from 'styled-components';
import { AiFillCaretUp, AiFillCaretDown } from 'react-icons/ai';

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

interface Props {}

const CartGoodsAmountInput: React.FC<Props> = ({}) => {
  return (
    <Wrapper>
      <Amount>7</Amount>
      <FlexRow>
        <Button>
          <AiFillCaretUp />
        </Button>
        <Button>
          <AiFillCaretDown />
        </Button>
      </FlexRow>
    </Wrapper>
  );
};

export default CartGoodsAmountInput;
