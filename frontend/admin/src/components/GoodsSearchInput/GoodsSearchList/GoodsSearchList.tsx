import React from 'react';
import { AutoSearch } from '@src/types/Search';
import { styled } from '@src/lib/CustomStyledComponent';
interface Props {
  searchList: AutoSearch[];
}
const GoodsSearchList: React.FC<Props> = ({ searchList }) => {
  return (
    <SearchListContainer>
      {searchList.map((item, i) => (
        <li key={i}>{item.title}</li>
      ))}
    </SearchListContainer>
  );
};

const SearchListContainer = styled('ul')`
  position: absolute;
  flex-direction: column;
  display: flex;
  top: 60px;
  border: 1px solid lightgray;
  width: calc(100% - 32px);
  padding: 12px;
  min-height: 150px;
  max-height: 60%;
  overflow: auto;
  background-color: #fff;
  z-index: 5;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  box-shadow: rgb(0 0 0 / 10%) 0px 4px 12px 0px;
`;

export default GoodsSearchList;
