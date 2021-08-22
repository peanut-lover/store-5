import React, { useCallback, useState } from 'react';
import { styled } from '@src/lib/CustomStyledComponent';
import useInput from '@src/hooks/useInput';
import { debounce } from '@src/utils/debounce';

interface Props {
  setKeyword: (keyword: string) => void;
}

const Search: React.FC<Props> = ({ setKeyword }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleAutoSearch = useCallback(
    (e) => {
      const keyword = e.target.value;
      setSearchInput(keyword);
      debounce(async () => {
        await setKeyword(keyword);
      }, 200);
    },
    [searchInput]
  );
  return (
    <SearchContainer>
      <SearchInput type='text' placeholder={'검색'} onInput={handleAutoSearch} value={searchInput} />
    </SearchContainer>
  );
};

const SearchContainer = styled('div')`
  width: fit-content;
  text-align: right;
  position: absolute;
  margin-top: -60px;
  right: 0;
`;

const SearchInput = styled('input')`
  padding: 0.5rem;
  letter-spacing: 0.05rem;
`;

export default Search;
