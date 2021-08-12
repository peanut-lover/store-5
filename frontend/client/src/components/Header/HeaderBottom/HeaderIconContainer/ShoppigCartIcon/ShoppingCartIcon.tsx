import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { IconContainer, IconTitle } from '../IconContainerStyle';
import { Link } from '@src/lib/CustomRouter';

const ShoppingCartIcon = () => (
  <Link to='/cart'>
    <IconContainer>
      <AiOutlineShoppingCart size='1.5em' />
      <IconTitle>장바구니</IconTitle>
    </IconContainer>
  </Link>
);

export default ShoppingCartIcon;
