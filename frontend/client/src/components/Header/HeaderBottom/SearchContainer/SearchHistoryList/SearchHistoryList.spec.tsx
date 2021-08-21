import React from 'react';

import { render, cleanup } from '@testing-library/react';

import SearchHistoryList from './SearchHistoryList';
import useSearchHistory from '@src/hooks/useSearchHistory';
import { usePushHistory } from '@src/lib/CustomRouter';

describe('SearchHistoryList Component', () => {
  const [searchHistory, handleSearchHistory, resetSearchHistory] = useSearchHistory();
  const push = usePushHistory();
  const handleClickHistory = (keyword: string) => {
    push(`/keyword/${keyword}`);
  };
  const handleDeleteHistory = (name: string) => {
    const updated = searchHistory.filter((keyword) => keyword !== name);
    handleSearchHistory(updated);
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
