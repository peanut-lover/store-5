import React from 'react';

import { render, cleanup } from '@testing-library/react';

import ProductItem from './ProductItem';

describe('ProductItem Component', () => {
  it('should render "Hello world" title and price 1000', () => {
    const wrapper = render(<ProductItem title='Hello world' price={1000}></ProductItem>);
    expect(wrapper.getByText('Hello world')).toBeInTheDocument();
    expect(wrapper.getByText('1000 원')).toBeInTheDocument();
  });

  it('should render with green tag', () => {
    const wrapper = render(<ProductItem title='test' isGreen price={1000}></ProductItem>);
    expect(wrapper.getByText('GREEN')).toBeInTheDocument();
  });

  it('should render with best tag', () => {
    const wrapper = render(<ProductItem title='test' isBest price={1000}></ProductItem>);
    expect(wrapper.getByText('BEST')).toBeInTheDocument();
  });

  it('should render with sale tag', () => {
    const wrapper = render(<ProductItem title='test' isSale price={1000}></ProductItem>);
    expect(wrapper.getByText('SALE')).toBeInTheDocument();
  });

  it('should render with new tag', () => {
    const wrapper = render(<ProductItem title='test' isNew price={1000}></ProductItem>);
    expect(wrapper.getByText('NEW')).toBeInTheDocument();
  });

  it('should render with discount rate', () => {
    const wrapper = render(<ProductItem title='test' isNew price={1000} discountRate={10}></ProductItem>);
    expect(wrapper.getByText('10 %')).toBeInTheDocument();
  });

  afterAll(cleanup);
});
