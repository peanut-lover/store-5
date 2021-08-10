import React from 'react';
import useSearchHistory from 'src/hooks/useSearchHistory';
import styled from 'styled-components';

const Container = styled.div``;

const SearchContainer = () => {
  const [searchHistory, setSearchHistory] = useSearchHistory();
  return (
    <Container>
      <form>
        <input />
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
