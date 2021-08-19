import { AiOutlineShop } from 'react-icons/ai';
import React from 'react';
import { styled } from '@src/lib/CustomStyledComponent';
import { theme } from '@src/theme/theme';
import { HeaderIconProps } from '@src/types/Header';

const GoodsAdminIcon: React.FC<HeaderIconProps> = ({ onClick, currentPath }) => {
  return (
    <HeaderIconContainer onClick={() => onClick('/goods')} disabled={currentPath !== '/goods'}>
      <AiOutlineShop size='2em' />
      <HeaderIconTitle>상품관리</HeaderIconTitle>
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
`;

export default GoodsAdminIcon;
