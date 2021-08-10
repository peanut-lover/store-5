import React, { useCallback } from 'react';
import useInput from 'src/hooks/useInput';
import useSearchHistory from 'src/hooks/useSearchHistory';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 100%;
  right: 15%;
`;

const SearchContainer = () => {
  const [searchHistory, setSearchHistory] = useSearchHistory();
  const [searchInput, onChangeSearchInput, setSearchInput] = useInput('');
  const onSearch = useCallback(
    (e) => {
      e.preventDefault();
      if (searchInput.length === 0) return;
      console.log(searchInput);
      setSearchHistory(searchInput);
      setSearchInput('');
    },
    [searchInput]
  );
  return (
    <Container>
      <form onSubmit={onSearch}>
        <input value={searchInput} onChange={onChangeSearchInput} />
        <button>검색</button>
      </form>
      <div />
      <div>
        <div>최근검색어</div>
        {searchHistory ? (
          <ul>
            {searchHistory.map((keyword, i) => (
              <li key={i}>{keyword}</li>
            ))}
          </ul>
        ) : (
          ''
        )}
      </div>
    </Container>
  );
};

export default SearchContainer;
