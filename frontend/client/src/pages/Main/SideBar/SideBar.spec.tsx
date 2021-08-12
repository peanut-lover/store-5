import React from 'react';

import { render, cleanup } from '@testing-library/react';

import Sidebar, { COUNT_OF_SHOWN_GOODS } from './SideBar';
import { Goods } from 'src/types/Goods';

describe('Goods Section Component', () => {
  it('사이드바는 최근 본 상품이 4개 이상일 때, 항상 4개의 이미지만을 보여줘야합니다.', () => {
    const mock_goods: Goods[] = [
      { id: 1, thumbnailImg: 'test_url', title: '맥쥬짠1', price: 10000 },
      { id: 2, thumbnailImg: 'test_url', title: '맥쥬짠2', price: 20000 },
      { id: 3, thumbnailImg: 'test_url', title: '맥쥬짠3', price: 30000 },
      { id: 4, thumbnailImg: 'test_url', title: '맥쥬짠4', price: 40000 },
    ];
    const wrapper = render(<Sidebar goodsList={mock_goods} />);
    expect(wrapper.queryAllByRole('img').length).toBe(COUNT_OF_SHOWN_GOODS);
  });

  it('사이드바는 최근 본 상품이 4개 이하일때, 상품을 모두 보여줘야합니다.', () => {
    const mock_goods: Goods[] = [
      { id: 1, thumbnailImg: 'test_url', title: '맥쥬짠1', price: 10000 },
      { id: 2, thumbnailImg: 'test_url', title: '맥쥬짠2', price: 20000 },
    ];
    const wrapper = render(<Sidebar goodsList={mock_goods} />);
    expect(wrapper.queryAllByRole('img').length).toBe(2);
  });

  it('이미지 url이 없는 상품은 no image div를 보여준다', () => {
    const mock_goods: Goods[] = [
      { id: 1, thumbnailImg: '', title: 'no image goods', price: 10000 },
      { id: 2, thumbnailImg: 'test_url', title: '맥쥬짠2', price: 20000 },
    ];
    const wrapper = render(<Sidebar goodsList={mock_goods} />);
    expect(wrapper.queryAllByRole('img').length).toBe(1);
  });

  // TODO: 사이드바 버튼했을 때 이미지를 어떻게 구분하지?

  afterAll(cleanup);
});
