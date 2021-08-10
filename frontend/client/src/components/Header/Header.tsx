import React from 'react';
<<<<<<< HEAD
import styled from 'styled-components';
import HeaderBottom from './HeaderBottom/HeaderBottom';
import HeaderTop from './HeaderTop/HeaderTop';

const Head = styled.header`
  position: relative;
  width: 100%;
  min-width: 1080px;
  height: 10vh;
  margin: auto;
`;
const Header = () => {
  return (
    <Head>
      <HeaderTop userName={''} />
      <HeaderBottom />
    </Head>
=======
import HeaderBottom from './HeaderBottom/HeaderBottom';
import HeaderTop from './HeaderTop/HeaderTop';

const Header = () => {
  return (
    <header>
      <HeaderTop userName={''} />
      <HeaderBottom />
    </header>
>>>>>>> 7eda423 (add: 헤더 아웃라인)
  );
};

export default Header;
