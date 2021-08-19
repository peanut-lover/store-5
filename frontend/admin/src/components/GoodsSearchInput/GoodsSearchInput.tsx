import useInput from '@src/hooks/useInput';
import { styled } from '@src/lib/CustomStyledComponent';
import { BsSearch } from 'react-icons/bs';
import React, { useCallback, useState } from 'react';
import SearchAPI from '@src/apis/searchAPI';
import { debounce } from '@src/utils/debounce';
import useAutoSearch from '@src/hooks/useAutoSearch';
import GoodsSearchList from '@src/components/GoodsSearchInput/GoodsSearchList/GoodsSearchList';
import { AutoSearch } from '@src/types/Search';

const INPUT_PLACEHOLDER = '상품을 검색해주세요.';

interface Props {
  onUpdateSelectedGoods: (goods: AutoSearch) => void;
}

const GoodsSearchInput: React.FC<Props> = ({ onUpdateSelectedGoods }) => {
  const [searchValue, onChangeSearchValue] = useInput('');
  const [autoSearchList, fetchAutoSearch] = useAutoSearch();
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleKeywordMatching = useCallback(
    (e) => {
      const keyword = e.target.value;
      debounce(async () => {
        await fetchAutoSearch(keyword);
      }, 100);
    },
    [SearchAPI.getAutoSearchList]
  );

  const handleInputFocuseFalse = useCallback(() => {
    setIsInputFocused(false);
  }, [setIsInputFocused]);
  const handleInputFocuseTrue = useCallback(() => {
    setIsInputFocused(true);
  }, [setIsInputFocused]);

  return (
    <>
      <SearchInputForm>
        <SearchInput
          type='text'
          value={searchValue}
          onChange={onChangeSearchValue}
          onInput={handleKeywordMatching}
          onBlur={handleInputFocuseFalse}
          onFocus={handleInputFocuseTrue}
          placeholder={INPUT_PLACEHOLDER}
        />
        <BsSearch size='1.3em' cursor='pointer' />
        {autoSearchList.length > 0 && isInputFocused && (
          <GoodsSearchList searchList={autoSearchList} onUpdateSelectedGoods={onUpdateSelectedGoods} />
        )}
      </SearchInputForm>
    </>
  );
};

const SearchInputForm = styled('form')`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  margin-top: 20px;
  height: 80px;
  width: 70%;
  padding: 16px;
  border: 1px solid rgb(221, 221, 221);
  border-radius: 6px;
  box-shadow: rgb(0 0 0 / 10%) 0 -2px 10px 1px;
`;

const SearchInput = styled('input')`
  width: 70%;
  font-size: 1.2em;
  height: 70px;
  margin: 0px;
  outline: none;
  border: none;
`;
export default GoodsSearchInput;
