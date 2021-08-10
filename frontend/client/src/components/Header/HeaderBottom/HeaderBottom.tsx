import React from 'react';
import styled from 'styled-components';
import CategoryToggle from './CategoryToggle/CategoryToggle';
import HeaderIconContainer from './HeaderIconContainer/HeaderIconContainer';

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HeaderBottom = () => {
  return (
    <Bottom>
      <CategoryToggle />
      <div>
        <span>로고</span>
      </div>
      <HeaderIconContainer />
    </Bottom>
  );
};

export default HeaderBottom;
