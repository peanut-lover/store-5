import React, { useCallback } from 'react';
import styled from 'styled-components';

type Props = {
  searchHistory: string[];
  onDeleteHistory: (name: string) => void;
  onResetHistory: () => void;
};

const SearchHistoryList: React.FC<Props> = ({ searchHistory, onDeleteHistory, onResetHistory }) => {
  return (
    <>
      <Container>
        {searchHistory.map((keyword, i) => (
          <SearchItem key={i}>
            <Keyword>{keyword}</Keyword>
            <Button
              onClick={() => {
                onDeleteHistory(keyword);
              }}
            >
              x
            </Button>
          </SearchItem>
        ))}
      </Container>
      <Footer onClick={onResetHistory}>전체 삭제</Footer>
    </>
  );
};

const Container = styled.ul`
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
  z-index: 3;
  :hover {
    transform: scale(1.2);
    font-weight: 600;
  }
`;

const Footer = styled.div`
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
