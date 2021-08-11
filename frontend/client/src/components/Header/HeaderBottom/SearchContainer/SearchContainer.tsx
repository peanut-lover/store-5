import React, { useCallback } from 'react';
import useInput from 'src/hooks/useInput';
import useSearchHistory from 'src/hooks/useSearchHistory';
import { BsSearch } from 'react-icons/bs';
import styled from 'styled-components';
import SearchHistoryEmpty from './SearchHistoryEmpty/SearchHistoryEmpty';

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
      <FormContainer>
        <Form onSubmit={onSearch}>
          <Input value={searchInput} onChange={onChangeSearchInput} />
          <Button>
            <BsSearch size='1.3em' />
          </Button>
        </Form>
      </FormContainer>
      <Line />
      <ContentContainer>
        <ContentTitle>최근검색어</ContentTitle>
        {searchHistory ? (
          <SearchHistoryEmpty />
        ) : (
          // <ul>{searchHistory && searchHistory.map((keyword, i) => <li key={i}>{keyword}</li>)}</ul>
          <div>hi</div>
        )}
      </ContentContainer>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 100%;
  right: 15%;
  width: 330px;
  border: 1px solid lightgray;
  box-shadow: rgb(0 0 0 / 10%) 0px 4px 12px 0px;
`;

const FormContainer = styled.div`
  box-sizing: border-box;
  padding: 16px;
  width: 100%;
`;
const Form = styled.form`
  display: flex;
  position: relative;
  width: 100%;
  height: 50px;
  border: 0px;
  padding: 0px;
  margin: 0px;
  -webkit-box-align: center;
  align-items: center;
`;

const Input = styled.input`
  box-sizing: border-box;
  padding: 0px 50px 0px 16px;
  margin: 0px;
  outline: none;
  box-shadow: none;
  border-radius: 0px;
  -webkit-tap-highlight-color: rgb(0, 0, 0);
  appearance: none;
  display: flex;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 1px solid rgb(221, 221, 221);
  color: rgb(51, 51, 51);
`;

const Button = styled.button`
  position: absolute;
  border: none;
  padding: 0px;
  margin: 0px;
  outline: none;
  background-color: transparent;
  height: 100%;
  top: 0px;
  right: 0px;
  width: 50px;
  cursor: pointer;
`;

const Line = styled.div`
  height: 10px;
  background-color: rgb(238, 238, 238);
  border: 0px;
  margin: 0px;
`;

const ContentContainer = styled.div``;

const ContentTitle = styled.div`
  font-size: 18px;
  padding: 16px;
`;

export default SearchContainer;
