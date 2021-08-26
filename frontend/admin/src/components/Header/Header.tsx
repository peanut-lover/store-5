import BackIcon from '@src/components/Header/BackIcon/BackIcon';
import DashboardIcon from '@src/components/Header/DashboardIcon/DashboardIcon';
import GoodsAdminIcon from '@src/components/Header/GoodsAdminIcon/GoodsAdminIcon';
import LogoIcon from '@src/components/Header/LogoIcon/LogoIcon';
import OrderAdminIcon from '@src/components/Header/OrderAdminIcon/OrderAdminIcon';
import PromotionAdminIcon from '@src/components/Header/PromotionAdminIcon/PromotionAdminIcon';
import { useLocation } from '@src/lib/CustomRouter/CustomRouter';
import { styled } from '@src/lib/CustomStyledComponent';
import React, { useEffect, useState } from 'react';

const Header = () => {
  const [currentPath, setCurrentPath] = useState<string>('/');
  const path = useLocation();
  useEffect(() => {
    setCurrentPath(path);
  }, [path]);
  return (
    <HeaderContainer>
      <LogoContainer>
        <LogoIcon />
      </LogoContainer>
      <DashboardIcon currentPath={currentPath} />
      <GoodsAdminIcon currentPath={currentPath} />
      <OrderAdminIcon currentPath={currentPath} />
      <PromotionAdminIcon currentPath={currentPath} />
      <BackIcon />
    </HeaderContainer>
  );
};

const HeaderContainer = styled('header')`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  height: 100%;
  width: 170px;
  padding: 16px;
  border-right: 1px solid lightgray;
  box-shadow: 6px 1px 6px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 6px 1px 6px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 6px 1px 6px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
`;

const LogoContainer = styled('div')`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 10em;
`;

export default Header;
