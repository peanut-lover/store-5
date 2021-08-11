import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { IconContainer, IconTitle } from '../IconContainerStyle';
const ShoppingCartIcon = () => (
  <>
    <IconContainer>
      <AiOutlineShoppingCart size='1.5em' />
      <IconTitle>장바구니</IconTitle>
    </IconContainer>
  </>
);

export default ShoppingCartIcon;
