import React from 'react';
<<<<<<< HEAD
import styled from 'styled-components';

const SearchHistoryEmpty = () => {
  return (
    <Container>
      <Title>최근 검색 내역이 없어요!</Title>
      <SubTitle>우리 문방구에서 검색해봐요.</SubTitle>
      <SubTitle>한번 둘러보세요.</SubTitle>
    </Container>
  );
};

const Container = styled.div`
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
=======

const SearchHistoryEmpty = () => {
  return (
    <div>
      <div>최근 검색 내역이 없어요!</div>
      <p>우리 문방구에서 검색해봐요.</p>
      <p>한번 둘러보세요.</p>
    </div>
  );
};

>>>>>>> dcf6aef (add : 카테고리hover active 요소 삽입)
export default SearchHistoryEmpty;
