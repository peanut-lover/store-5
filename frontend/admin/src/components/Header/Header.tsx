import DashboardIcon from '@src/components/Header/DashboardIcon/DashboardIcon';
import GoodsAdminIcon from '@src/components/Header/GoodsAdminIcon/GoodsAdminIcon';
import LogoIcon from '@src/components/Header/LogoIcon/LogoIcon';
import OrderAdminIcon from '@src/components/Header/OrderAdminIcon/OrderAdminIcon';
import PromotionAdminIcon from '@src/components/Header/PromotionAdminIcon/PromotionAdminIcon';
import { styled } from '@src/lib/CustomStyledComponent';
import React from 'react';

const Header = () => {
  return (
    <HeaderContainer>
      <LogoContainer>
        <LogoIcon />
      </LogoContainer>
      <DashboardIcon />
      <GoodsAdminIcon />
      <OrderAdminIcon />
      <PromotionAdminIcon />
    </HeaderContainer>
  );
};

const HeaderContainer = styled('header')`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 10%;
  padding: 16px;
  background-color: gray;
`;

const LogoContainer = styled('div')``;

export default Header;
