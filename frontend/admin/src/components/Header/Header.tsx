import DashboardIcon from '@src/components/Header/DashboardIcon/DashboardIcon';
import GoodsAdminIcon from '@src/components/Header/GoodsAdminIcon/GoodsAdminIcon';
import LogoIcon from '@src/components/Header/LogoIcon/LogoIcon';
import OrderAdminIcon from '@src/components/Header/OrderAdminIcon/OrderAdminIcon';
import PromotionAdminIcon from '@src/components/Header/PromotionAdminIcon/PromotionAdminIcon';
import { useLocation, usePushHistory } from '@src/lib/CustomRouter/CustomRouter';
import { styled } from '@src/lib/CustomStyledComponent';
import { listen } from '@src/utils/customEvent';
import React, { useCallback, useEffect, useState } from 'react';

const Header = () => {
  const [currentPath, setCurrentPath] = useState<string>('/');
  const push = usePushHistory();

  const handleIconClick = useCallback(
    (path: string) => {
      push(path);
    },
    [setCurrentPath, useLocation]
  );

  useEffect(() => {
    listen('locationChange', ((e: CustomEvent) => {
      setCurrentPath(e.detail.location);
    }) as EventListener);
  }, []);

  return (
    <HeaderContainer>
      <LogoContainer>
        <LogoIcon onClick={handleIconClick} />
      </LogoContainer>
      <DashboardIcon onClick={handleIconClick} currentPath={currentPath} />
      <GoodsAdminIcon onClick={handleIconClick} currentPath={currentPath} />
      <OrderAdminIcon onClick={handleIconClick} currentPath={currentPath} />
      <PromotionAdminIcon onClick={handleIconClick} currentPath={currentPath} />
    </HeaderContainer>
  );
};

const HeaderContainer = styled('header')`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 170px;
  padding: 16px;
  border-right: 1px solid lightgray;
  box-shadow: 6px 1px 6px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 6px 1px 6px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 6px 1px 6px rgba(0, 0, 0, 0.1);
`;

const LogoContainer = styled('div')`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 10em;
`;

export default Header;
