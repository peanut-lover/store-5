import React from 'react';
import ProductItem from 'src/components/ProductItem/ProductItem';

const mockImagePath =
  'https://user-images.githubusercontent.com/20085849/128860803-24b0e9a7-1482-4ca6-9a8c-ba30e7271e7a.jpeg';

const Main = () => (
  <div>
    <h1> Main Page</h1>
    <ProductItem title='예시' price={10000} />
    <ProductItem img={mockImagePath} title='예시' price={1000} />
    <ProductItem title='예시' price={1000} />
  </div>
);

export default Main;
