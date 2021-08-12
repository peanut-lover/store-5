import React, { useCallback } from 'react';
import styled from 'styled-components';

interface Props {
  searchHistory: string[];
  onDeleteHistory: (name: string) => void;
  onResetHistory: () => void;
}

const SearchHistoryList: React.FC<Props> = ({ searchHistory, onDeleteHistory, onResetHistory }) => {
  const handleDeleteHistory = useCallback(
    (e, keyword) => {
      e.stopPropagation();
      onDeleteHistory(keyword);
    },
    [onDeleteHistory]
  );
  const handleResetHistory = useCallback(
    (e) => {
      e.stopPropagation();
      onResetHistory();
    },
    [onResetHistory]
  );
  return (
    <>
      <SearchHistoryContainer>
        {searchHistory.map((keyword, i) => (
          <SearchItem key={i}>
            <Keyword>{keyword}</Keyword>
            <Button
              onClick={(e) => {
                handleDeleteHistory(e, keyword);
              }}
            >
              x
            </Button>
          </SearchItem>
        ))}
      </SearchHistoryContainer>
      <SearchHistoryFooter onClick={handleResetHistory}>전체 삭제</SearchHistoryFooter>
    </>
  );
};

const SearchHistoryContainer = styled.ul`
  padding: 0 16px;
  height: 300px;
  overflow: hidden auto;
`;

const SearchItem = styled.li`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  :hover {
    background-color: #e6e9e9;
  }
`;

const Keyword = styled.div`
  text-align: center;
  line-height: 2em;
`;

const Button = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  color: gray;
  font-size: 1.2em;
  z-index: 3;
  :hover {
    transform: scale(1.2);
    font-weight: 600;
  }
`;

const SearchHistoryFooter = styled.div`
  height: 52px;
  text-align: center;
  line-height: 50px;
  font-size: 14px;
  color: rgb(136, 136, 136);
  background-color: rgb(246, 246, 246);
  border-top: 1px solid lightgray;
  margin-top: 13px;
  cursor: pointer;
`;
export default SearchHistoryList;
