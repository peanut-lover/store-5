import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ShoppingCartIcon from '@src/components/Header/HeaderBottom/HeaderIconContainer/ShoppigCartIcon/ShoppingCartIcon';
import SearchIcon from '@src/components/Header/HeaderBottom/HeaderIconContainer/SearchIcon/SearchIcon';
import MyPageIcon from '@src/components/Header/HeaderBottom/HeaderIconContainer/MyPageIcon/MyPageIcon';
import { Link } from '@src/lib/CustomRouter';

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
    <HeaderIconsContainer>
      <Link to='/cart'>
        <ShoppingCartIcon />
      </Link>
      <SearchIcon searchRef={searchRef} openSearchForm={openSearchForm} onOpenSearchForm={handleOpenSearchForm} />
      <MyPageIcon />
    </HeaderIconsContainer>
  );
};

const HeaderIconsContainer = styled.div`
  display: flex;
`;

export default HeaderIconContainer;
