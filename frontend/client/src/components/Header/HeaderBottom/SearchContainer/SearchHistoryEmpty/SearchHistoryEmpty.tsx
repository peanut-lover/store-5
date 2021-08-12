import React from 'react';
import styled from 'styled-components';

const SearchHistoryEmpty = () => {
  return (
    <SearchHistoryContainer>
      <Title>최근 검색 내역이 없어요!</Title>
      <SubTitle>우리 문방구에서 검색해봐요.</SubTitle>
      <SubTitle>한번 둘러보세요.</SubTitle>
    </SearchHistoryContainer>
  );
};

const SearchHistoryContainer = styled.div`
  text-align: center;
  padding-top: 55px;
  padding-bottom: 98px;
  background-color: #fff;
`;
const Title = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
`;

const SubTitle = styled.p`
  font-size: 13px;
  color: gray;
  opacity: 0.9;
  padding-bottom: 2px;
`;
export default SearchHistoryEmpty;
