import React, { RefObject } from 'react';
import { BsSearch } from 'react-icons/bs';
import { IconContainer, IconTitle } from '../IconContainerStyle';
import SearchContainer from '@src/components/Header/HeaderBottom/SearchContainer/SearchContainer';

interface Props {
  searchRef: RefObject<HTMLDivElement>;
  openSearchForm: boolean;
  onOpenSearchForm: () => void;
}

const SearchIcon: React.FC<Props> = ({ searchRef, openSearchForm, onOpenSearchForm }) => (
  <IconContainer ref={searchRef} onClick={onOpenSearchForm}>
    <BsSearch size='1.5em' />
    <IconTitle>상품검색</IconTitle>
    {openSearchForm && <SearchContainer />}
  </IconContainer>
);

export default SearchIcon;
