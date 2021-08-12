import React from 'react';

import { render, cleanup } from '@testing-library/react';

import SearchHistoryList from './SearchHistoryList';

describe('SearchHistoryList Component', () => {
  it('should render "test1" "test2" in HistoryList', () => {
    const wrapper = render(
      <SearchHistoryList
        searchHistory={['test1', 'test2']}
        onDeleteHistory={() => {}}
        onResetHistory={() => {}}
      ></SearchHistoryList>
    );
    expect(wrapper.getByText('test1')).toBeInTheDocument();
    expect(wrapper.getByText('test2')).toBeInTheDocument();
  });

  it('should render "test1" in historyList', () => {
    const wrapper = render(
      <SearchHistoryList
        searchHistory={['test1']}
        onDeleteHistory={() => {}}
        onResetHistory={() => {}}
      ></SearchHistoryList>
    );
    expect(wrapper.getByText('test1')).toBeInTheDocument();
  });

  it('should render "안되나요" in historyList', () => {
    const wrapper = render(
      <SearchHistoryList
        searchHistory={['물건이', '검색이', '안되나요']}
        onDeleteHistory={() => {}}
        onResetHistory={() => {}}
      ></SearchHistoryList>
    );
    expect(wrapper.getByText('안되나요')).toBeInTheDocument();
  });

  afterAll(cleanup);
});
