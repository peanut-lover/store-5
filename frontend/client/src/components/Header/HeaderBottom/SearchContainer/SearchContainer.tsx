import React from 'react';
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
  const [searchInput, onChangeSearchInput] = useInput('');
  return (
    <Container>
      <form>
        <input onChange={onChangeSearchInput} />
        <button>검색</button>
      </form>
      <div />
      <div>
        <div>최근검색어</div>
        {/* {searchHistory ? } */}
      </div>
    </Container>
  );
};

export default SearchContainer;
