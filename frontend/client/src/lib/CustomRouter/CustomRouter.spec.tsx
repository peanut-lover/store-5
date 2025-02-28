import React from 'react';

import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import { Router, Routes, Route, Link, useParams } from '@src/lib/CustomRouter/CustomRouter';

describe('Custom Router Component', () => {
  it('커스텀 라우팅이 Link를 통한 라우팅을 정상적으로 진행해야한다.', () => {
    const wrapper = render(
      <Router>
        <Link to='/a'>go to a</Link>
        <Link to='/b'>go to b</Link>
        <Routes>
          <Route path='/a'>
            <div>a page</div>
          </Route>
        </Routes>
      </Router>
    );

    expect(wrapper.queryByText('a page')).toBeNull();
    expect(wrapper.queryByText('b page')).toBeNull();

    const aLink = wrapper.queryByText('go to a');
    expect(aLink).toBeInTheDocument();

    if (!aLink) {
      throw new Error('a Link is Null');
    }

    fireEvent.click(aLink);

    expect(wrapper.getByText('a page')).toBeInTheDocument();
  });

  it('/item/:id와 같이 Router에서 param를 얻어올 수 있어야한다.', async () => {
    const Item: React.FC = () => {
      const { id } = useParams();
      return (
        <>
          <div className='test-product'>Viewing product-{id}</div>
        </>
      );
    };

    const wrapper = render(
      <Router>
        <Link to='/item/1'>go to item1</Link>
        <Link to='/item/2'>go to item2</Link>
        <Routes>
          <Route path='/item/:id'>
            <Item />
          </Route>
        </Routes>
      </Router>
    );

    const item1Btn = wrapper.queryByText('go to item1');
    const item2Btn = wrapper.queryByText('go to item2');

    expect(item1Btn).toBeInTheDocument();
    expect(item2Btn).toBeInTheDocument();

    expect(wrapper.queryByText('product-1')).toBeNull();
    expect(wrapper.queryByText('product-2')).toBeNull();

    // Click Item 1 Link
    fireEvent.click(item1Btn!);
    const $itemPage1 = wrapper.container.querySelector('.test-product');
    expect($itemPage1).not.toBeNull();
    expect($itemPage1!.textContent).toEqual('Viewing product-1');

    // Click Item 2 Link
    fireEvent.click(item2Btn!);
    const $itemPage2 = wrapper.container.querySelector('.test-product');
    expect($itemPage2).not.toBeNull();
    expect($itemPage2!.textContent).toEqual('Viewing product-2');
  });

  it('exact 속성을 사용시 엄격하게 path 매칭 수행해야한다. ', () => {
    window.history.pushState({}, '', '/'); // 이전 테스트 케이스에 의존하지않게 하기 위해 location 을 초기화
    const wrapper = render(
      <Router>
        <Link to='/strict'>go to strict path</Link>
        <Link to='/'>go to default</Link>
        <Routes exact>
          <Route path='/'>default page</Route>
          <Route path='/strict'>strict page</Route>
        </Routes>
      </Router>
    );

    expect(wrapper.queryByText('strict')).toBeNull();
    const link = wrapper.queryByText('go to strict path');
    expect(link).toBeInTheDocument();

    expect(wrapper.getByText('default page')).toBeInTheDocument();

    if (!link) {
      throw new Error('a Link is Null');
    }

    fireEvent.click(link);

    expect(wrapper.getByText('strict page')).toBeInTheDocument();
  });
});
