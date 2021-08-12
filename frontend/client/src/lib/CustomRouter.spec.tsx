import React from 'react';

import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import { Router, Routes, Route, Link, useParams } from '@src/lib/CustomRouter';

describe('Custom Router Component', () => {
  it('커스텀 라우팅이 Link를 통한 라우팅을 정상적으로 진행해야한다.', async () => {
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

  it('/item/1 와 같이 Router에서 param를 얻어올 수 있어야한다.', async () => {
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
});
