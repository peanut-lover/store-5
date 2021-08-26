import React, { useState } from 'react';
import styled from 'styled-components';
import RecentGoodsView from '@src/components/SideBar/RecentGoodsView';
import useRecentGoodsHistory from '@src/hooks/useRecentGoodsHistory';
import { usePushHistory } from '@src/lib/CustomRouter';

const SideBar = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [recentGoodsList, setRecentGoodsList] = useRecentGoodsHistory();
  const pushHistory = usePushHistory();

  const handleDeleteRecentGoods = (id: number) => {
    const filtered = recentGoodsList.filter((recentGoods) => recentGoods.id !== id);
    setRecentGoodsList(filtered);
  };

  const handleClickRecentGoods = (id: number) => {
    pushHistory(`/detail/${id}`);
  };

  const toggleDisplay = () => {
    setIsShow(!isShow);
  };

  return (
    <SideBarContainer hide={!isShow}>
      <ToggleButton onClick={() => toggleDisplay()}>{isShow ? '숨기기' : '최근 본 상품 보기'}</ToggleButton>
      <RecentGoodsView
        goodsList={recentGoodsList}
        onDeleteGoods={handleDeleteRecentGoods}
        onClickGoods={handleClickRecentGoods}
      />
    </SideBarContainer>
  );
};

interface SideBarContainerProps {
  hide: boolean;
}

const SideBarContainer = styled.div<SideBarContainerProps>`
  display: flex;
  align-items: center;
  z-index: 99;
  position: fixed;

  right: 0px;
  top: 50%;
  ${(props) => (props.hide ? 'transform: translate(80%, -50%);' : 'transform: translate(0%, -50%);')}
  will-change: transform;
  transition: transform 0.2s;
  width: 160px;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) => props.theme.line};
  background-color: white;
`;

const ToggleButton = styled.div`
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 20%;
  padding: 10px;
  font-size: 1rem;
  font-weight: 600;
  writing-mode: vertical-lr;
`;

export default SideBar;
