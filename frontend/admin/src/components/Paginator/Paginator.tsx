import React from 'react';
import styled from 'styled-components';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { range } from '@src/utils/range';
import { theme } from '@src/theme/theme';

interface Props {
  totalPage: number;
  currentPage: number;
  rangeOfPage?: number;
  setPage: (page: number) => void;
}
const DEFAULT_PAGE_RANGE = 5;
const Paginator: React.FC<Props> = ({ totalPage, currentPage, rangeOfPage = DEFAULT_PAGE_RANGE, setPage }) => {
  const startPage = Math.floor(currentPage / rangeOfPage) * rangeOfPage + 1;
  const endPage = startPage + rangeOfPage < totalPage ? startPage + rangeOfPage - 1 : totalPage;

  const pages = range(startPage, endPage);

  const onClickPage = (page: number) => {
    setPage(page);
  };

  const onClickNextPage = () => {
    const nextPage = Math.min(currentPage + rangeOfPage, totalPage);
    setPage(nextPage);
  };

  const onClickPreviousPage = () => {
    const prevPage = Math.max(currentPage - rangeOfPage, 1);
    setPage(prevPage);
  };

  return pages.length === 0 ? null : (
    <PaginatorContainer>
      <PaginationButton onClick={onClickPreviousPage}>
        <FaAngleLeft size={20} />
      </PaginationButton>
      <PageList>
        {pages.map((page) => (
          <PageButton key={page} onClick={() => onClickPage(page)} active={page === currentPage}>
            {page}
          </PageButton>
        ))}
      </PageList>
      <PaginationButton onClick={onClickNextPage}>
        <FaAngleRight size={20} />
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

const PageButton = styled.li<{ active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  color: ${(props) => (props.active ? theme.primary : 'black')};
  &:hover {
    transform: scale(1.5);
  }
`;

export default Paginator;
