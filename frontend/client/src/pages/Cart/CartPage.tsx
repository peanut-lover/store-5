import React, { useState } from 'react';
import CartContainerWithAPI from './CartContainerWithAPI';
import CartContainerWithLocalStorage from './CartContainerWithLocalstorage';

const CartPage: React.FC = () => {
  // TODO: 로그인 상태 관리법 결정 시 대응 수정하기
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isLoggedIn) {
    return <CartContainerWithAPI />;
  }

  return <CartContainerWithLocalStorage />;
};

export default CartPage;
