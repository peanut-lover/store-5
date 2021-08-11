import React, { useCallback, useReducer } from 'react';
import { BsSearch } from 'react-icons/bs';
import styled from 'styled-components';
import SearchHistoryEmpty from './SearchHistoryEmpty/SearchHistoryEmpty';
import SearchHistoryList from './SearchHistoryList/SearchHistoryList';
import useInput from 'src/hooks/useInput';
import useSearchHistory from 'src/hooks/useSearchHistory';
import { debounce } from 'src/utils/debounce';
import AutoSearchList from './AutoSearchList/AutoSearchList';

const reducer = (state: string[], action: { type: string; keyword: string }) => {
  switch (action.type) {
    case 'SEARCH':
      // TODO: API 호출 연동
      if (action.keyword === '맛') {
        const res = ['자동', '검색', '기능'];
        return res;
      } else if (action.keyword === '맛집') {
        const res = ['으악', '악으', '으아'];
        return res;
      } else {
        return [];
      }

    default:
      return state;
  }
};

const SearchContainer = () => {
  const [searchHistory, setSearchHistory] = useSearchHistory();
  const [searchInput, onChangeSearchInput, setSearchInput] = useInput('');
  const [autoSearchList, dispatch] = useReducer(reducer, ['맛집', '테스트', '입니다']);

  const onSearch = useCallback(
    (e) => {
      e.preventDefault();
      if (searchInput.length === 0) return;
      setSearchHistory(searchInput);
      setSearchInput('');
    },
    [searchInput]
  );
  const onAutoSearch = useCallback((e) => {
    const keyword = e.target.value;
    debounce(() => {
      dispatch({ type: 'SEARCH', keyword });
    }, 500);
  }, []);
  return (
    <Container>
      <FormContainer>
        <Form onSubmit={onSearch}>
          <Input value={searchInput} onChange={onChangeSearchInput} onInput={onAutoSearch} />
          <Button>
            <BsSearch size='1.3em' />
          </Button>
        </Form>
        {autoSearchList.length > 0 && <AutoSearchList autoSearchList={autoSearchList} />}
      </FormContainer>
      <Line />
      <ContentContainer>
        <ContentTitle>최근검색어</ContentTitle>
        {searchHistory.length > 0 ? <SearchHistoryList searchHistory={searchHistory} /> : <SearchHistoryEmpty />}
      </ContentContainer>
    </Container>
  );
};

const Container = styled.div`
  z-index: 2;
  position: absolute;
  top: 100%;
  right: 15%;
  width: 330px;
  border: 1px solid lightgray;
  box-shadow: rgb(0 0 0 / 10%) 0px 4px 12px 0px;
  background-color: #fff;
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
  padding: 0px 50px 0px 16px;
  margin: 0px;
  outline: none;
  box-shadow: none;
  border-radius: 6px;
  -webkit-tap-highlight-color: rgb(0, 0, 0);
  appearance: none;
  display: flex;
  width: 100%;
  height: 100%;
  border: 1px solid rgb(221, 221, 221);
  color: rgb(51, 51, 51);
`;

const Button = styled.button`
  position: absolute;
  border: 0px;
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
