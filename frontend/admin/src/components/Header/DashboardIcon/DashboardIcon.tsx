import React from 'react';
import { styled } from '@src/lib/CustomStyledComponent';
import { theme } from '@src/theme/theme';
import { HeaderIconProps } from '@src/types/Header';
import { usePushHistory } from '@src/lib/CustomRouter';
import { ADMIN_MAIN_PATH } from '@src/constants/adminPath';

import { FaThLarge } from '@react-icons/all-files/fa/FaThLarge';

const DashboardIcon: React.FC<HeaderIconProps> = ({ currentPath }) => {
  const push = usePushHistory();

  return (
    <HeaderIconContainer onClick={() => push(ADMIN_MAIN_PATH)} disabled={currentPath !== ADMIN_MAIN_PATH}>
      <FaThLarge size='2em' />
      <HeaderIconTitle>대시보드</HeaderIconTitle>
    </HeaderIconContainer>
  );
};

interface IconContainerProps {
  disabled: boolean;
}

export const HeaderIconContainer = styled('div')<IconContainerProps>`
  display: flex;
  align-items: center;
  margin-bottom: 48px;
  padding: 12px;
  color: ${(props) => (props.disabled ? 'lightgray' : '#fff')};
  background-color: ${(props) => (props.disabled ? 'transparent' : theme.greenColor)};
  border-radius: 12px;
  cursor: pointer;
`;

export const HeaderIconTitle = styled('span')`
  margin-left: 12px;
  user-select: none;
`;

export default DashboardIcon;
