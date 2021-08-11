import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Link } from '@src/lib/CustomRouter';

type Props = {
  autoSearchList: string[];
  onAddHistory: (keyword: string) => void;
};

const AutoSearchList: React.FC<Props> = ({ autoSearchList, onAddHistory }) => {
  return (
    <Container onMouseDown={(e) => e.preventDefault()}>
      {autoSearchList.map((keyword, i) => (
        <Link key={i} to={`/goods?keyword=${keyword}`}>
          <Keyword onClick={() => onAddHistory(keyword)}>{keyword}</Keyword>
        </Link>
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
  line-height: 1.5em;
  cursor: pointer;
  :hover {
    background-color: #e6e9e9;
  }
`;

export default AutoSearchList;
