import React from 'react';
import { styled } from '@src/lib/CustomStyledComponent';
import logoIcon from '@src/../public/images/logo.png';

interface Props {
  onClick: (path: string) => void;
}

const LogoIcon: React.FC<Props> = ({ onClick }) => {
  return (
    <LogoContainer onClick={() => onClick('/')}>
      <Logo src={logoIcon} />
    </LogoContainer>
  );
};

const LogoContainer = styled('div')`
  width: 100%;
  cursor: pointer;
`;

const Logo = styled('img')`
  width: 100%;
`;

export default LogoIcon;
