import React from 'react';
import styled from 'styled-components';
import HeaderBottom from './HeaderBottom/HeaderBottom';
import HeaderTop from './HeaderTop/HeaderTop';

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderTop userName={''} />
      <HeaderBottom />
    </HeaderContainer>
  );
};
const HeaderContainer = styled.header`
  position: relative;
  width: 100%;
  min-width: 1080px;
  height: 10vh;
  margin: auto;
`;

export default Header;
