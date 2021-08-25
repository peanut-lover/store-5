import { RiAdvertisementLine } from 'react-icons/ri';
import React from 'react';
import { styled } from '@src/lib/CustomStyledComponent';
import { theme } from '@src/theme/theme';
import { HeaderIconProps } from '@src/types/Header';
import { usePushHistory } from '@src/lib/CustomRouter';
import { ADMIN_PROMOTION_PATH } from '@src/constants/adminPath';

const PromotionAdminIcon: React.FC<HeaderIconProps> = ({ currentPath }) => {
  const push = usePushHistory();
  return (
    <HeaderIconContainer onClick={() => push(ADMIN_PROMOTION_PATH)} disabled={currentPath !== ADMIN_PROMOTION_PATH}>
      <RiAdvertisementLine size='2em' />
      <HeaderIconTitle>프로모션</HeaderIconTitle>
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

export default PromotionAdminIcon;
