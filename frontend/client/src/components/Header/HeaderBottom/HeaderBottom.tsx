import React from 'react';
import styled from 'styled-components';
import CategoryToggle from './CategoryToggle/CategoryToggle';
import HeaderIconContainer from './HeaderIconContainer/HeaderIconContainer';
import logoIcon from '@src/../public/images/logo.png';
import { Link } from '@src/lib/CustomRouter';

const HeaderBottom = () => {
  return (
    <HeaderBottomContainer>
      <CategoryToggle />
      <LogoContainer>
        <Link to='/'>
          <Logo src={logoIcon} />
        </Link>
      </LogoContainer>
      <HeaderIconContainer />
    </HeaderBottomContainer>
  );
};
const HeaderBottomContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 65%;
  padding: 0 15% 0 15%;
  border-bottom: 1px solid lightgray;
  border-top: 1px solid lightgray;
`;
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 156px;
`;
const Logo = styled.img`
  width: 100%;
`;

export default HeaderBottom;
