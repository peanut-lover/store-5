import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaArrowUp } from '@react-icons/all-files/fa/FaArrowUp';
import { FaArrowDown } from '@react-icons/all-files/fa/FaArrowDown';
import { FaTimesCircle } from '@react-icons/all-files/fa/FaTimesCircle';

import { Goods } from '@src/types/Goods';

interface SideBarProps {
  goodsList?: Goods[];
  onDeleteGoods?: (goodsId: number) => void;
  onClickGoods?: (goodsId: number) => void;
}

export const COUNT_OF_SHOWN_GOODS = 4;

const RecentGoodsView: React.FC<SideBarProps> = ({ goodsList = [], onDeleteGoods, onClickGoods }) => {
  const [recentGoodsIdx, setRecentGoodsIndx] = useState(0);

  const handleUpList = () => {
    if (recentGoodsIdx > 0) {
      setRecentGoodsIndx(recentGoodsIdx - 1);
    }
  };

  const handleDownList = () => {
    if (recentGoodsIdx < goodsList.length - 1) {
      setRecentGoodsIndx(recentGoodsIdx + 1);
    }
  };

  const handleDeleteRecentGoods = (e: React.MouseEvent, id: number) => {
    onDeleteGoods && onDeleteGoods(id);
    e.stopPropagation();
  };

  const handleClickRecentGoods = (e: React.MouseEvent, id: number) => {
    onClickGoods && onClickGoods(id);
    e.stopPropagation();
  };

  useEffect(() => {
    setRecentGoodsIndx(0);
  }, [goodsList]);

  return (
    <RecentGoodsViewContainer>
      <ArrowButton onClick={handleUpList}>
        <FaArrowUp />
      </ArrowButton>
      <Splitter />
      <RecentGoodsList>
        {goodsList?.slice(recentGoodsIdx, recentGoodsIdx + COUNT_OF_SHOWN_GOODS).map((goods) => (
          <GoodsThumbnailBox key={goods.id} onClick={(e) => handleClickRecentGoods(e, goods.id)}>
            {goods.thumbnailUrl ? (
              <GoodsThumbnail src={goods.thumbnailUrl} />
            ) : (
              <EmptyGoodsThumbnail>No Image</EmptyGoodsThumbnail>
            )}
            <DeleteGoods onClick={(e) => handleDeleteRecentGoods(e, goods.id)}>
              <FaTimesCircle size={20} />
            </DeleteGoods>
          </GoodsThumbnailBox>
        ))}
      </RecentGoodsList>
      <Splitter />
      <ArrowButton onClick={handleDownList}>
        <FaArrowDown />
      </ArrowButton>
    </RecentGoodsViewContainer>
  );
};

interface SideBarContainerProps {
  theme: {
    line: string;
    offWhite: string;
  };
}

const RecentGoodsViewContainer = styled.div<SideBarContainerProps>`
  flex-grow: 1;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const RecentGoodsList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-y: scroll;

  min-height: 400px;
  padding: 5px 0px;
`;

const ArrowButton = styled.button`
  border: none;
  cursor: pointer;
  background-color: transparent;
  height: 30px;
`;

interface SplitterProps {
  theme: {
    line: string;
  };
}
const Splitter = styled.span<SplitterProps>`
  background-color: ${(props) => props.theme.line};
  width: 100%;
  height: 3px;
`;

interface GoodsThumbnailBoxProps {
  theme: {
    line: string;
  };
}
const GoodsThumbnailBox = styled.div<GoodsThumbnailBoxProps>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 85px;
  height: 85px;
  border: 2px solid transparent;
  margin-bottom: 5px;
  margin-top: 5px;
  &:hover {
    border: 2px solid ${(props) => props.theme.line};
  }
`;

const GoodsThumbnail = styled.img`
  cursor: pointer;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

interface EmptyGoodsThumbnailProps {
  theme: {
    darkPrimary: string;
  };
}

const EmptyGoodsThumbnail = styled.div<EmptyGoodsThumbnailProps>`
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.darkPrimary};
  background-color: ${(props) => props.theme.dustWhite};
  opacity: 0.5px;
`;

interface DeleteGoodsProps {
  theme: {
    line: string;
  };
}
const DeleteGoods = styled.div<DeleteGoodsProps>`
  cursor: pointer;
  position: absolute;
  right: -10px;
  top: -10px;
  width: 20px;
  height: 20px;
  border-radius: 999px;
  background-color: white;
  color: ${(props) => props.theme.line};
  visibility: hidden;

  ${GoodsThumbnailBox}:hover > & {
    visibility: visible;
  }

  :hover {
    transform: scale(1.2);
  }
`;
export default RecentGoodsView;
