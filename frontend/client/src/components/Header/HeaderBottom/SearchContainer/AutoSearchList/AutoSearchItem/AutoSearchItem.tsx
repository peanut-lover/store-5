import { usePushHistory } from '@src/lib/CustomRouter';
import { AutoSearch } from '@src/types/Search';
import React from 'react';
import styled from 'styled-components';

export interface Props {
  searchedItem: AutoSearch;
  onAddHistory: (keyword: string, itemId: number) => Promise<void>;
}
const AutoSearchItem: React.FC<Props> = ({ onAddHistory, searchedItem }) => {
  const handleClick = () => {
    onAddHistory(searchedItem.title, searchedItem.id);
  };
  return (
    <AutoSearchItemContainer onClick={handleClick}>
      <AutoSearchItemImage src={searchedItem.thumbnailUrl} />
      <AutoSearchItemTitle>{searchedItem.title}</AutoSearchItemTitle>
    </AutoSearchItemContainer>
  );
};

const AutoSearchItemContainer = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  height: 30px;
  cursor: pointer;
  :hover {
    background-color: #e6e9e9;
  }
`;

const AutoSearchItemImage = styled.img`
  width: 15%;
  height: 100%;
  margin-right: 15px;
  border-radius: 8px;
`;

const AutoSearchItemTitle = styled.span``;

export default AutoSearchItem;
