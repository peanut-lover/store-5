import React from 'react';

import { render, cleanup } from '@testing-library/react';

import GoodsItem from './GoodsItem';

describe('GoodsItem Component', () => {
  it('should render "Hello world" title and price 1000', () => {
    const wrapper = render(<GoodsItem id={1} title='Hello world' price={1000}></GoodsItem>);
    expect(wrapper.getByText('Hello world')).toBeInTheDocument();
  });

  it('should render with green tag', () => {
    const wrapper = render(<GoodsItem id={1} title='test' isGreen price={1000}></GoodsItem>);
    expect(wrapper.getByText('GREEN')).toBeInTheDocument();
  });

  it('should render with best tag', () => {
    const wrapper = render(<GoodsItem id={1} title='test' isBest price={1000}></GoodsItem>);
    expect(wrapper.getByText('BEST')).toBeInTheDocument();
  });

  it('should render with sale tag', () => {
    const wrapper = render(<GoodsItem id={1} title='test' isSale price={1000}></GoodsItem>);
    expect(wrapper.getByText('SALE')).toBeInTheDocument();
  });

  it('should render with new tag', () => {
    const wrapper = render(<GoodsItem id={1} title='test' isNew price={1000}></GoodsItem>);
    expect(wrapper.getByText('NEW')).toBeInTheDocument();
  });

  it('should render with discount rate', () => {
    const wrapper = render(<GoodsItem id={1} title='test' isNew price={1000} discountRate={10}></GoodsItem>);
    expect(wrapper.getByText('10 %')).toBeInTheDocument();
  });

  afterAll(cleanup);
});
