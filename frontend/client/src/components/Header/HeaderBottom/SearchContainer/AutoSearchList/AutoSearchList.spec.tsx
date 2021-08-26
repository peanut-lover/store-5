import React from 'react';

import { render, cleanup } from '@testing-library/react';

import AutoSearchList from './AutoSearchList';

describe('AutoSearchList Component', () => {
  it('should render "test1" "test2"', () => {
    const wrapper = render(
      <AutoSearchList
        autoSearchList={[
          { id: 1, title: 'test1', thumbnailUrl: 'http:' },
          { id: 2, title: 'test2', thumbnailUrl: 'http:asd' },
        ]}
        onAddHistory={async () => {}}
      ></AutoSearchList>
    );
    expect(wrapper.getByText('test1')).toBeInTheDocument();
    expect(wrapper.getByText('test2')).toBeInTheDocument();
  });

  it('should render "문구"', () => {
    const wrapper = render(
      <AutoSearchList
        autoSearchList={[{ id: 1, title: '문구', thumbnailUrl: 'http:' }]}
        onAddHistory={async () => {}}
      ></AutoSearchList>
    );
    expect(wrapper.getByText('문구')).toBeInTheDocument();
  });

  it('should render "빈물건"', () => {
    const wrapper = render(
      <AutoSearchList
        autoSearchList={[
          { id: 1, title: '빈물건', thumbnailUrl: 'http:' },
          { id: 2, title: '사줘요', thumbnailUrl: 'http:' },
          { id: 3, title: '제발', thumbnailUrl: 'http:' },
        ]}
        onAddHistory={async () => {}}
      ></AutoSearchList>
    );
    expect(wrapper.getByText('빈물건')).toBeInTheDocument();
  });

  afterAll(cleanup);
});
