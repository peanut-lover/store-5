import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import SearchContainer from '@src/components/Header/HeaderBottom/SearchContainer/SearchContainer';

const HeaderIconContainer = () => {
  const searchRef = useRef<HTMLDivElement>(null);
  const [openSearchForm, setOpenSearchForm] = useState(false);

  const handleOpenSearchForm = useCallback(() => {
    setOpenSearchForm(true);
  }, [setOpenSearchForm]);
  const handleCloseSearchForm = useCallback(
    (e) => {
      const el = searchRef.current as HTMLElement;
      if (el && !el.contains(e.target)) setOpenSearchForm(false);
    },
    [setOpenSearchForm]
  );

  useEffect(() => {
    document.addEventListener('click', handleCloseSearchForm);
    return () => {
      document.removeEventListener('click', handleCloseSearchForm);
    };
  }, []);

  return (
    <Container>
      <IconContainer>
        <AiOutlineShoppingCart size='1.5em' />
        <IconTitle>장바구니</IconTitle>
      </IconContainer>
      <IconContainer ref={searchRef} onClick={handleOpenSearchForm}>
        <BsSearch size='1.5em' />
        <IconTitle>상품검색</IconTitle>
        {openSearchForm && <SearchContainer />}
      </IconContainer>
      <IconContainer>
        <CgProfile size='1.5em' />
        <IconTitle>마이페이지</IconTitle>
      </IconContainer>
    </Container>
  );
};
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
export default HeaderIconContainer;
