import React from 'react';
import styled from 'styled-components';
import HeaderBottom from './HeaderBottom/HeaderBottom';
import HeaderTop from './HeaderTop/HeaderTop';

const Head = styled.header`
  width: 70%;
  margin: auto;
`;
const Header = () => {
  return (
    <Head>
      <HeaderTop userName={''} />
      <HeaderBottom />
    </Head>
  );
};

export default Header;
