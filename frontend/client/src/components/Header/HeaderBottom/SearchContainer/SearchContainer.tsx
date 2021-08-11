import React, { useState, useCallback, useReducer, useRef, useEffect } from 'react';
import { BsSearch } from 'react-icons/bs';
import styled from 'styled-components';
import SearchHistoryEmpty from './SearchHistoryEmpty/SearchHistoryEmpty';
import SearchHistoryList from './SearchHistoryList/SearchHistoryList';
import useInput from '@src/hooks/useInput';
import useSearchHistory from '@src/hooks/useSearchHistory';
import { debounce } from '@src/utils/debounce';
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
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputFocused, setInputFocused] = useState(false);
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
  const onClickKeyword = useCallback((keyword: string) => {
    console.log(`/product?keyword=${keyword}`);
  }, []);

  useEffect(() => {
    const input = inputRef.current as HTMLInputElement;
    input.addEventListener('focus', () => {
      setInputFocused(true);
    });
    input.addEventListener('blur', function () {
      setInputFocused(false);
    });
  }, []);
  return (
    <Container>
      <FormContainer>
        <Form onSubmit={onSearch}>
          <Input ref={inputRef} value={searchInput} onChange={onChangeSearchInput} onInput={onAutoSearch} />
          <Button>
            <BsSearch size='1.3em' />
          </Button>
        </Form>
        {autoSearchList.length > 0 && inputFocused && (
          <AutoSearchList autoSearchList={autoSearchList} onClickKeyword={onClickKeyword} />
        )}
      </FormContainer>
      <Line />
      <ContentContainer>
        <ContentTitle>최근검색어</ContentTitle>
        {searchHistory.length > 0 ? (
          <SearchHistoryList searchHistory={searchHistory} onClickKeyword={onClickKeyword} />
        ) : (
          <SearchHistoryEmpty />
        )}
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
  :focus {
    box-shadow: rgb(0 0 0 / 10%) 0 -2px 10px 1px;
  }
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
