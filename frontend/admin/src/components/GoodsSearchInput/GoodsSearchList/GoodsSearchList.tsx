import React, { useCallback } from 'react';
import { AutoSearch } from '@src/types/Search';
import { styled } from '@src/lib/CustomStyledComponent';
import GoodsSearchItem from '@src/components/GoodsSearchInput/GoodsSearchList/GoodsSearchItem/GoodsSearchItem';
interface Props {
  searchList: AutoSearch[];
  onUpdateSelectedGoods: (goods: AutoSearch) => void;
}
const GoodsSearchList: React.FC<Props> = ({ searchList, onUpdateSelectedGoods }) => {
  return (
    <SearchListContainer
      onMouseDown={(e) => {
        e.preventDefault();
      }}
    >
      {searchList.map((item) => (
        <GoodsSearchItem key={item.id} searchGoods={item} onUpdateSelectedGoods={onUpdateSelectedGoods} />
      ))}
    </SearchListContainer>
  );
};

const SearchListContainer = styled('ul')`
  position: absolute;
  flex-direction: column;
  display: flex;
  top: 80px;
  border: 1px solid lightgray;
  width: 100%;
  padding: 12px;
  min-height: 150px;
  max-height: 300px;
  overflow: auto;
  background-color: #fff;
  z-index: 5;
  border-top: 0;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  box-shadow: rgb(0 0 0 / 10%) 0px 4px 12px 0px;
`;

export default GoodsSearchList;
