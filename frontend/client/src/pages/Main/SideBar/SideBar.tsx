import React from 'react';
import styled from 'styled-components';
import RecentGoodsView from '@src/pages/Main/SideBar/RecentGoodsView';
import useRecentGoodsHistory from '@src/hooks/useRecentGoodsHistory';
import { usePushHistory } from '@src/lib/CustomRouter';

const SideBar = () => {
  const [recentGoodsList, setRecentGoodsList] = useRecentGoodsHistory();
  const pushHistory = usePushHistory();

  const handleDeleteRecentGoods = (id: number) => {
    console.log('delete' + id);
    const filtered = recentGoodsList.filter((recentGoods) => recentGoods.id !== id);
    setRecentGoodsList(filtered);
  };

  const handleClickRecentGoods = (id: number) => {
    pushHistory(`/detail/${id}`);
  };

  return (
    <SideBarContainer>
      <RecentGoodsView
        goodsList={recentGoodsList}
        onDeleteGoods={handleDeleteRecentGoods}
        onClickGoods={handleClickRecentGoods}
      />
    </SideBarContainer>
  );
};

const SideBarContainer = styled.div`
  z-index: 99;
  position: fixed;
  right: 0px;
  top: 50%;
  transform: translate(0, -50%);
  width: 140px;
  padding: 0px 10px;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) => props.theme.line};
  background-color: white;
`;

export default SideBar;
