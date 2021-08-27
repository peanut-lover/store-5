import React from 'react';

import { render, cleanup, waitFor } from '@testing-library/react';
import Paginator from './Paginator';

describe('Paginator Component', () => {
  it('Paginator는 페이지가 totalPage가 rangeOfPage + currentPage 보다 클 때 range 범위만큼 잘 나타나야한다.', () => {
    let tempPage = 0;
    const setPage = (page: number) => {
      tempPage = page;
    };

    const wrapper = render(<Paginator totalPage={5} currentPage={1} rangeOfPage={4} setPage={setPage} />);

    expect(wrapper.getByText(1)).toBeInTheDocument();
    expect(wrapper.getByText(2)).toBeInTheDocument();
    expect(wrapper.getByText(3)).toBeInTheDocument();
    expect(wrapper.getByText(4)).toBeInTheDocument();
    expect(wrapper.queryByText(5)).toBeNull();
  });

  it('currentPage가 현재 보여지는 페이지 범위의 끝 페이지를 나타낼 때, 페이지 전환이 되서는 안된다.', () => {
    let tempPage = 0;
    const setPage = (page: number) => {
      tempPage = page;
    };

    const wrapper = render(<Paginator totalPage={5} currentPage={5} rangeOfPage={5} setPage={setPage} />);

    expect(wrapper.getByText(1)).toBeInTheDocument();
    expect(wrapper.getByText(2)).toBeInTheDocument();
    expect(wrapper.getByText(3)).toBeInTheDocument();
    expect(wrapper.getByText(4)).toBeInTheDocument();
    expect(wrapper.getByText(5)).toBeInTheDocument();
    expect(wrapper.queryByText(6)).toBeNull();
  });

  it('currentPage는 0보다 커야한다.', () => {
    const wrapper = render(<Paginator totalPage={5} currentPage={0} rangeOfPage={5} />);
    expect(wrapper.getByText('paginator error')).toBeInTheDocument();
  });

  it('currentPage는 totalPage보다 작아야한다.', () => {
    const wrapper = render(<Paginator totalPage={5} currentPage={6} rangeOfPage={5} />);
    expect(wrapper.getByText('paginator error')).toBeInTheDocument();
  });

  it('rangeOfPage는 1이상 이어야한다.', () => {
    const wrapper = render(<Paginator totalPage={5} currentPage={1} rangeOfPage={0} />);
    expect(wrapper.getByText('paginator error')).toBeInTheDocument();
  });

  it('rangeOfPage는 음수가 되면 안된다.', () => {
    const wrapper = render(<Paginator totalPage={5} currentPage={1} rangeOfPage={-1} />);
    expect(wrapper.getByText('paginator error')).toBeInTheDocument();
  });

  afterAll(cleanup);
});
