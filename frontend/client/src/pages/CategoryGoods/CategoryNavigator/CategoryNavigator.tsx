import React from 'react';
import styled from 'styled-components';

const CategoryNavigator = () => {
  return (
    <CategoryListContainer>
      <li>
        <p>잡화</p>
        <ul>
          <li>잡화1</li>
          <li>잡화2</li>
          <li>잡화3</li>
        </ul>
      </li>
      <li>
        <p>카테고리 1</p>
      </li>
      <li>
        <p>카테고리 2</p>
      </li>
      <li>
        <p>카테고리 3</p>
      </li>
    </CategoryListContainer>
  );
};

const CategoryListContainer = styled.ul`
  width: 100%;
`;

export default CategoryNavigator;
