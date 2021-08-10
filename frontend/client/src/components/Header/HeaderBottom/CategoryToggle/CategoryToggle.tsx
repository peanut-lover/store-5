import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import styled from 'styled-components';

const Category = styled.div`
  display: flex;
`;

const Title = styled.h3`
  margin: 0;
`;

const CategoryToggle = () => {
  return (
    <Category>
      <GiHamburgerMenu />
      <Title>전체 카테고리</Title>
    </Category>
  );
};

export default CategoryToggle;
