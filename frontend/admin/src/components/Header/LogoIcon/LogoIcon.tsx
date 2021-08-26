import React from 'react';
import { styled } from '@src/lib/CustomStyledComponent';
import logoIcon from '@src/../public/images/logo.png';
import { Link } from '@src/lib/CustomRouter';
import { ADMIN_MAIN_PATH } from '@src/constants/adminPath';

const LogoIcon = () => {
  return (
    <Link to={ADMIN_MAIN_PATH}>
      <LogoContainer>
        <Logo src={logoIcon} />
      </LogoContainer>
    </Link>
  );
};

const LogoContainer = styled('div')`
  width: 100%;
  cursor: pointer;
`;

const Logo = styled('img')`
  width: 100%;
  user-select: none;
`;

export default LogoIcon;
