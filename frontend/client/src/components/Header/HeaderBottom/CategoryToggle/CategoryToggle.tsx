import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
<<<<<<< HEAD
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
  line-height: 2em;
  font-size: 20px;
`;

const CategoryToggle = () => {
  return (
    <Toggle>
      <GiHamburgerMenu size='1.7em' />
      <Title>전체 카테고리</Title>
      <Category />
    </Toggle>
=======

const CategoryToggle = () => {
  return (
    <div>
      <GiHamburgerMenu />
      <h3>전체 카테고리</h3>
    </div>
>>>>>>> 7eda423 (add: 헤더 아웃라인)
  );
};

export default CategoryToggle;
