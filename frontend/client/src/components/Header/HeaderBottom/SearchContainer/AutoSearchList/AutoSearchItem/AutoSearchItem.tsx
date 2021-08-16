import { usePushHistory } from '@src/lib/CustomRouter';
import { AutoSearch } from '@src/types/Search';
import React from 'react';
import styled from 'styled-components';

export interface Props {
  onAddHistory: (keyword: string) => Promise<void>;
  searchedItem: AutoSearch;
}
const AutoSearchItem: React.FC<Props> = ({ onAddHistory, searchedItem }) => {
  const push = usePushHistory();
  const handleClick = async () => {
    await onAddHistory(searchedItem.title);
    push(`/detail/${searchedItem.title}`);
  };
  return <AutoSearchItemContainer onClick={handleClick}></AutoSearchItemContainer>;
};

const AutoSearchItemContainer = styled.li`
  margin-bottom: 12px;
  line-height: 1.5em;
  cursor: pointer;
  :hover {
    background-color: #e6e9e9;
  }
`;

export default AutoSearchItem;
