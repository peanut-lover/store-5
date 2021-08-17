import React from 'react';
import styled from 'styled-components';
import { BsFillCaretLeftFill, BsFillCaretRightFill } from 'react-icons/bs';
import { range } from '@src/utils/range';
import { Link } from '@src/lib/CustomRouter';

interface Props {
  totalPage: number;
  currentPage: number;
  rangeOfPage?: number;
  onClickNextPage?: () => void;
  onClickPreviousPage?: () => void;
}
const DEFAULT_PAGE_RANGE = 5;
const Paginator: React.FC<Props> = ({
  totalPage,
  currentPage,
  rangeOfPage = DEFAULT_PAGE_RANGE,
  onClickNextPage,
  onClickPreviousPage,
}) => {
  const startPage = Math.floor(currentPage / rangeOfPage) * rangeOfPage + 1;
  const endPage = startPage + rangeOfPage < totalPage ? startPage + rangeOfPage : totalPage;

  const pages = range(startPage, endPage);

  return (
    <PaginatorContainer>
      <PaginationButton onClick={onClickNextPage}>
        <BsFillCaretLeftFill size={20} />
      </PaginationButton>
      <PageList>
        {pages.map((page) => (
          <PageButton key={page}>{page}</PageButton>
        ))}
      </PageList>
      <PaginationButton onClick={onClickPreviousPage}>
        <BsFillCaretRightFill size={20} />
      </PaginationButton>
    </PaginatorContainer>
  );
};

const PaginatorContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
`;

const PaginationButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 1rem;
  &:hover {
    transform: scale(1.5);
  }
`;

const PageList = styled.ul`
  display: flex;
  width: 200px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const PageButton = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 2rem;
  height: 2rem;

  &:hover {
    transform: scale(1.5);
  }
`;

export default Paginator;
