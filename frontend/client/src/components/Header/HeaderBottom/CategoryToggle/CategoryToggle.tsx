import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import Category from 'src/components/Header/HeaderBottom/Category/Category';
import styled from 'styled-components';

const Toggle = styled.div`
  display: flex;
  align-items: center;
  color: rgb(115, 103, 92);
  cursor: pointer;
`;

const Title = styled.h3`
  margin: 0;
  margin-left: 6px;
`;

const CategoryToggle = () => {
  return (
    <Toggle>
      <GiHamburgerMenu size='1.7em' />
      <Title>전체 카테고리</Title>
      <Category />
    </Toggle>
  );
};

export default CategoryToggle;
