import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { IconContainer, IconTitle } from '../IconContainerStyle';
import SearchContainer from '@src/components/Header/HeaderBottom/SearchContainer/SearchContainer';

const SearchIcon = () => {
  const searchRef = useRef<HTMLDivElement>(null);
  const [openSearchForm, setOpenSearchForm] = useState(false);

  const handleOpenSearchForm = useCallback(() => {
    setOpenSearchForm(true);
  }, [setOpenSearchForm]);

  const handleCloseSearchForm = useCallback(
    (e) => {
      const el = searchRef.current as HTMLElement;
      if (el && !el.contains(e.target)) setOpenSearchForm(false);
    },
    [setOpenSearchForm]
  );

  useEffect(() => {
    document.addEventListener('click', handleCloseSearchForm);
    return () => {
      document.removeEventListener('click', handleCloseSearchForm);
    };
  }, []);

  return (
    <IconContainer ref={searchRef} onClick={handleOpenSearchForm}>
      <BsSearch size='1.5em' />
      <IconTitle>상품검색</IconTitle>
      {openSearchForm && <SearchContainer onClose={handleCloseSearchForm} />}
    </IconContainer>
  );
};

export default SearchIcon;
