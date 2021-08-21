import React from 'react';
import { render, cleanup } from '@testing-library/react';
import SearchHistoryList from './SearchHistoryList';

describe('SearchHistoryList Component', () => {
  const handleClickHistory = (keyword: string) => {
    console.log(`${keyword}로 이동`);
  };
  const handleDeleteHistory = (name: string) => {
    console.log(`delete ${name}`);
  };
  const resetSearchHistory = () => {
    console.log(`reset`);
  };

  it('should render "test1" "test2" in HistoryList', () => {
    const wrapper = render(
      <SearchHistoryList
        searchHistory={['test1', 'test2']}
        onClickHistory={() => handleClickHistory('test1')}
        onDeleteHistory={() => handleDeleteHistory('test2')}
        onResetHistory={() => {
          resetSearchHistory();
        }}
      ></SearchHistoryList>
    );
    expect(wrapper.getByText('test1')).toBeInTheDocument();
    expect(wrapper.getByText('test2')).toBeInTheDocument();
  });

  it('should render "test1" in historyList', () => {
    const wrapper = render(
      <SearchHistoryList
        searchHistory={['test1']}
        onClickHistory={() => handleClickHistory('test1')}
        onDeleteHistory={() => handleDeleteHistory('test1')}
        onResetHistory={() => {
          resetSearchHistory();
        }}
      ></SearchHistoryList>
    );
    expect(wrapper.getByText('test1')).toBeInTheDocument();
  });

  it('should render "안되나요" in historyList', () => {
    const wrapper = render(
      <SearchHistoryList
        searchHistory={['물건이', '검색이', '안되나요']}
        onClickHistory={() => handleClickHistory('물건이')}
        onDeleteHistory={() => handleDeleteHistory('안되나요')}
        onResetHistory={() => {
          resetSearchHistory();
        }}
      ></SearchHistoryList>
    );
    expect(wrapper.getByText('안되나요')).toBeInTheDocument();
  });

  afterAll(cleanup);
});
