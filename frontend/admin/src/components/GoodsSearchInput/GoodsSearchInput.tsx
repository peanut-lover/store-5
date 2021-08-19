import useInput from '@src/hooks/useInput';
import { styled } from '@src/lib/CustomStyledComponent';
import { BsSearch } from 'react-icons/bs';
import React, { useCallback, useRef } from 'react';
import SearchAPI from '@src/apis/searchAPI';
import { debounce } from '@src/utils/debounce';
import useAutoSearch from '@src/hooks/useAutoSearch';

const INPUT_PLACEHOLDER = '상품을 검색해주세요.';

const GoodsSearchInput: React.FC = () => {
  const [searchValue, onChangeSearchValue] = useInput('');
  const [autoSearchList, fetchAutoSearch] = useAutoSearch();

  const handleKeywordMatching = useCallback(
    (e) => {
      const keyword = e.target.value;
      debounce(async () => {
        await fetchAutoSearch(keyword);
      }, 100);
    },
    [SearchAPI.getAutoSearchList]
  );
  return (
    <SearchInputForm>
      <SearchInput
        type='text'
        value={searchValue}
        onChange={onChangeSearchValue}
        onInput={handleKeywordMatching}
        placeholder={INPUT_PLACEHOLDER}
      />
      <BsSearch size='1.3em' />
    </SearchInputForm>
  );
};

const SearchInputForm = styled('form')`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  margin-top: 20px;
  width: 70%;
  padding: 16px;
  border: 1px solid rgb(221, 221, 221);
  border-radius: 6px;
  box-shadow: rgb(0 0 0 / 10%) 0 -2px 10px 1px;
`;

const SearchInput = styled('input')`
  width: 70%;
  line-height: 2em;
  font-size: 1.2em;
  margin: 0px;
  outline: none;
  border: none;
`;
export default GoodsSearchInput;
