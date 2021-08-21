import { usePushHistory } from '@src/lib/CustomRouter';
import LoginModal from '@src/portal/LoginModal/LoginModal';
import { userState } from '@src/recoil/userState';
import React, { useCallback } from 'react';
import { useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useRecoilValue } from 'recoil';
import { IconContainer, IconTitle } from '../IconContainerStyle';

const ShoppingCartIcon = () => {
  const push = usePushHistory();
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
  const userRecoil = useRecoilValue(userState);

  const handlePushCart = useCallback(() => {
    push('/cart');
  }, [push]);

  const handleOpenModal = useCallback(() => {
    setOpenLoginModal(true);
  }, [setOpenLoginModal]);

  const handleCloseModal = useCallback(() => {
    setOpenLoginModal(false);
  }, [setOpenLoginModal]);
  return (
    <IconContainer onClick={userRecoil.isLoggedIn ? handlePushCart : handleOpenModal}>
      <AiOutlineShoppingCart size='1.5em' />
      <IconTitle>장바구니</IconTitle>
      {openLoginModal && <LoginModal onClose={handleCloseModal} />}
    </IconContainer>
  );
};

export default ShoppingCartIcon;
