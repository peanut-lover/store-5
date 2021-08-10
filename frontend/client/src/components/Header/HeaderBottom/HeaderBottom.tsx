import React from 'react';
<<<<<<< HEAD
import styled from 'styled-components';
import CategoryToggle from './CategoryToggle/CategoryToggle';
import HeaderIconContainer from './HeaderIconContainer/HeaderIconContainer';

const Bottom = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 65%;
  padding: 0 15% 0 15%;
  border-bottom: 1px solid lightgray;
  border-top: 1px solid lightgray;
`;

const HeaderBottom = () => {
  return (
    <Bottom>
=======
import CategoryToggle from './CategoryToggle/CategoryToggle';
import HeaderIconContainer from './HeaderIconContainer/HeaderIconContainer';
const HeaderBottom = () => {
  return (
    <div>
>>>>>>> 7eda423 (add: 헤더 아웃라인)
      <CategoryToggle />
      <div>
        <span>로고</span>
      </div>
      <HeaderIconContainer />
<<<<<<< HEAD
    </Bottom>
=======
    </div>
>>>>>>> 7eda423 (add: 헤더 아웃라인)
  );
};

export default HeaderBottom;
