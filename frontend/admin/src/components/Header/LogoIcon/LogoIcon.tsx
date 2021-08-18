import React from 'react';
import { styled } from '@src/lib/CustomStyledComponent';
import logoIcon from '@src/../public/images/logo.png';

const LogoIcon = () => {
  return (
    <LogoContainer>
      <Logo src={logoIcon} />
    </LogoContainer>
  );
};

const LogoContainer = styled('div')``;

const Logo = styled('img')``;

export default LogoIcon;
