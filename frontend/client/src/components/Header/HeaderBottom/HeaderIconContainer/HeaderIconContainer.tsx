import React from 'react';
import styled from 'styled-components';
import ShoppingCartIcon from '@src/components/Header/HeaderBottom/HeaderIconContainer/ShoppigCartIcon/ShoppingCartIcon';
import SearchIcon from '@src/components/Header/HeaderBottom/HeaderIconContainer/SearchIcon/SearchIcon';
import MyPageIcon from '@src/components/Header/HeaderBottom/HeaderIconContainer/MyPageIcon/MyPageIcon';
import { Link } from '@src/lib/CustomRouter/CustomRouter';

const HeaderIconContainer = () => {
  return (
    <HeaderIconsContainer>
      <ShoppingCartIcon />
      <SearchIcon />
      <MyPageIcon />
    </HeaderIconsContainer>
  );
};

const HeaderIconsContainer = styled.div`
  display: flex;
`;

export default HeaderIconContainer;
