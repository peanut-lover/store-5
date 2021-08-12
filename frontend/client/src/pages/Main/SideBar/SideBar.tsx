import React, { useState } from 'react';
import styled from 'styled-components';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai';
import { ThumbnailGoods } from '@src/types/Goods';
import { useRef } from 'react';
import { useEffect } from 'react';
interface SideBarProps {
  goodsList?: ThumbnailGoods[];
}

const COUNT_OF_SHOWN_GOODS = 3;
// TODO: SideBar도 Intersection Observer
const SideBar: React.FC<SideBarProps> = ({ goodsList }) => {
  const [recentGoods, setRecentGoods] = useState(goodsList ?? []);
  const [recentGoodsIdx, setRecentGoodsIndx] = useState(0);
  const handleUpList = () => {
    if (recentGoodsIdx > 0) {
      setRecentGoodsIndx(recentGoodsIdx - 1);
    }
  };
  const handleDownList = () => {
    if (recentGoodsIdx < recentGoods.length - 1) {
      setRecentGoodsIndx(recentGoodsIdx + 1);
    }
  };

  const handleDeleteRecentGoods = (id: number) => {
    // TODO: Delete API
    console.log('Delete goods -' + id);
  };

  return (
    <>
      <SideBarContainer>
        <ArrowButton onClick={handleUpList}>
          <FaArrowUp />
        </ArrowButton>
        <Splitter />
        <RecentGoodsList>
          {goodsList?.slice(recentGoodsIdx, recentGoodsIdx + COUNT_OF_SHOWN_GOODS).map((goods) => (
            <GoodsThumbnailBox key={goods.id}>
              {goods.thumbnailImg ? (
                <GoodsThumbnail src={goods.thumbnailImg} />
              ) : (
                <EmptyGoodsThumbnail>No Image</EmptyGoodsThumbnail>
              )}
              <DeleteGoods onClick={() => handleDeleteRecentGoods(goods.id)}>
                <AiFillCloseCircle size={20} />
              </DeleteGoods>
            </GoodsThumbnailBox>
          ))}
        </RecentGoodsList>
        <Splitter />
        <ArrowButton onClick={handleDownList}>
          <FaArrowDown />
        </ArrowButton>
      </SideBarContainer>
    </>
  );
};

interface SideBarContainerProps {
  theme: {
    line: string;
    offWhite: string;
  };
}

const SideBarContainer = styled.div<SideBarContainerProps>`
  position: fixed;
  right: 0px;
  top: 50%;
  padding: 0px 10px;
  width: 140px;
  height: 350px;
  transform: translate(0, -50%);
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) => props.theme.line};
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const RecentGoodsList = styled.ul`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-y: scroll;
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
  width: 100%;
  height: 100%;
  pointer-events: none;
  object-fit: contain;
`;

interface EmptyGoodsThumbnailProps {
  theme: {
    darkPrimary: string;
  };
}
const EmptyGoodsThumbnail = styled.div<EmptyGoodsThumbnailProps>`
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
export default SideBar;
