import React from 'react';
import styled from 'styled-components';
import { Link } from '@src/lib/CustomRouter/CustomRouter';
import { AutoSearch } from '@src/types/Search';
import AutoSearchItem from '@src/components/Header/HeaderBottom/SearchContainer/AutoSearchList/AutoSearchItem/AutoSearchItem';

interface Props {
  autoSearchList: AutoSearch[];
  onAddHistory: (keyword: string, itemId: number) => Promise<void>;
}

const AutoSearchList: React.FC<Props> = ({ autoSearchList, onAddHistory }) => {
  return (
    <AutoSearchListContainer onMouseDown={(e) => e.preventDefault()}>
      {autoSearchList.map((item, i) => (
        <AutoSearchItem key={i} onAddHistory={onAddHistory} searchedItem={item} />
      ))}
    </AutoSearchListContainer>
  );
};

const AutoSearchListContainer = styled.ul`
  position: absolute;
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
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }
`;

export default AutoSearchList;
