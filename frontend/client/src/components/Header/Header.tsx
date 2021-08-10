import React from 'react';
import HeaderBottom from './HeaderBottom/HeaderBottom';
import HeaderTop from './HeaderTop/HeaderTop';

const Header = () => {
  return (
    <header>
      <HeaderTop userName={''} />
      <HeaderBottom />
    </header>
  );
};

export default Header;
