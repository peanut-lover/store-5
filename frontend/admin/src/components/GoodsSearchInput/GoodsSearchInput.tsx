import useInput from '@src/hooks/useInput';
import { styled } from '@src/lib/CustomStyledComponent';
import { FaSearch } from '@react-icons/all-files/fa/FaSearch';
import React, { FormEvent, useCallback, useState } from 'react';
import { debounce } from '@src/utils/debounce';
import useAutoSearch from '@src/hooks/useAutoSearch';
import GoodsSearchList from '@src/components/GoodsSearchInput/GoodsSearchList/GoodsSearchList';
import { AutoSearchedItem } from '@src/types/Search';

const INPUT_PLACEHOLDER = '상품을 검색해주세요.';

interface Props {
  onUpdateSelectedGoods: (goods: AutoSearchedItem) => void;
}

const GoodsSearchInput: React.FC<Props> = ({ onUpdateSelectedGoods }) => {
  const [searchValue, onChangeSearchValue] = useInput('');
  const [autoSearchList, fetchAutoSearch] = useAutoSearch();
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (autoSearchList) {
      onUpdateSelectedGoods(autoSearchList[0]);
      setIsInputFocused(false);
    }
  };

  const handleKeywordMatching = useCallback(
    (e) => {
      if (!isInputFocused) setIsInputFocused(true);
      const keyword = e.target.value;
      debounce(async () => {
        await fetchAutoSearch(keyword);
      }, 100);
    },
    [isInputFocused]
  );

  const handleInputFocuseFalse = useCallback(() => {
    setIsInputFocused(false);
  }, []);

  const handleInputFocuseTrue = useCallback(() => {
    setIsInputFocused(true);
  }, []);

  const handleSelectedGoods = useCallback(
    (goods: AutoSearchedItem) => {
      onUpdateSelectedGoods(goods);
      setIsInputFocused(false);
    },
    [onUpdateSelectedGoods, setIsInputFocused]
  );

  return (
    <>
      <SearchInputForm onSubmit={handleSubmit}>
        <SearchInput
          type='text'
          value={searchValue}
          onChange={onChangeSearchValue}
          onInput={handleKeywordMatching}
          onBlur={handleInputFocuseFalse}
          onClick={handleInputFocuseTrue}
          placeholder={INPUT_PLACEHOLDER}
        />
        <FaSearch size='1.3em' cursor='pointer' />
        {autoSearchList.length > 0 && isInputFocused && (
          <GoodsSearchList searchList={autoSearchList} onUpdateSelectedGoods={handleSelectedGoods} />
        )}
      </SearchInputForm>
    </>
  );
};

const SearchInputForm = styled('form')`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: auto;
  margin-top: 2rem;
  width: 70%;
  height: 60px;
  padding: 16px;
  border: 1px solid rgb(221, 221, 221);
  border-radius: 4px;
`;

const SearchInput = styled('input')`
  width: 70%;
  font-size: 1.2em;
  height: 50px;
  margin: 0px;
  outline: none;
  border: none;
`;
export default GoodsSearchInput;
