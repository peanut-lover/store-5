import React from 'react';
import logoIcon from '@src/../public/images/logo.png';
import { Link } from '@src/lib/CustomRouter';
import styled from 'styled-components';

const HeaderLogo = () => (
  <LogoContainer>
    <Link to='/'>
      <Logo src={logoIcon} />
    </Link>
  </LogoContainer>
);

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 156px;
`;
const Logo = styled.img`
  width: 100%;
`;

export default HeaderLogo;
