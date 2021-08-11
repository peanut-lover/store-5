import React from 'react';
import styled from 'styled-components';

const SearchHistoryList: React.FC<{ searchHistory: string[] }> = ({ searchHistory }) => {
  return (
    <Container>
      {searchHistory.map((keyword, i) => (
        <SearchItem key={i}>
          <Keyword>{keyword}</Keyword>
          <Button>x</Button>
        </SearchItem>
      ))}
    </Container>
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
export default SearchHistoryList;
