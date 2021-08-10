import React from 'react';
import CategoryToggle from './CategoryToggle/CategoryToggle';
import HeaderIconContainer from './HeaderIconContainer/HeaderIconContainer';
const HeaderBottom = () => {
  return (
    <div>
      <CategoryToggle />
      <div>
        <span>로고</span>
      </div>
      <HeaderIconContainer />
    </div>
  );
};

export default HeaderBottom;
