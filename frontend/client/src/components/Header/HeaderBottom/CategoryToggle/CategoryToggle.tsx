import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import styled from 'styled-components';

const Category = styled.div`
  display: flex;
  align-items: center;
  color: rgb(115, 103, 92);
`;

const Title = styled.h3`
  margin: 0;
  margin-left: 6px;
`;

const CategoryToggle = () => {
  return (
    <Category>
      <GiHamburgerMenu size="1.7em" />
      <Title>전체 카테고리</Title>
    </Category>
  );
};

export default CategoryToggle;
