import React from 'react';
import styled from 'styled-components';

const AutoSearchList: React.FC<{ autoSearchList: string[] }> = ({ autoSearchList }) => {
  return (
    <Container>
      {autoSearchList.map((keyword, i) => (
        <Keyword key={i}>{keyword}</Keyword>
      ))}
    </Container>
  );
};

const Container = styled.ul`
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
`;

const Keyword = styled.li`
  margin-bottom: 12px;
`;

export default AutoSearchList;
