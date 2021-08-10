import React from 'react';
import styled from 'styled-components';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import SearchContainer from 'src/components/Header/HeaderBottom/SearchContainer/SearchContainer';

const Container = styled.div`
  display: flex;
`;

const IconContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 4em;
  :not(:last-child) {
    border-right: 1px solid lightgray;
  }
  cursor: pointer;
`;

const IconTitle = styled.span`
  font-size: 0.7rem;
  margin-top: 6px;
  color: gray;
`;

const HeaderIconContainer = () => {
  return (
    <Container>
      <IconContainer>
        <AiOutlineShoppingCart size='1.5em' />
        <IconTitle>장바구니</IconTitle>
      </IconContainer>
      <IconContainer>
        <BsSearch size='1.5em' />
        <IconTitle>상품검색</IconTitle>
      </IconContainer>
      <IconContainer>
        <CgProfile size='1.5em' />
        <IconTitle>마이페이지</IconTitle>
      </IconContainer>
      <SearchContainer />
    </Container>
  );
};

export default HeaderIconContainer;
