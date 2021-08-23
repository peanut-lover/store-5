import { getCarts } from '@src/apis/cartAPI';
import { usePushHistory } from '@src/lib/CustomRouter';
import LoginModal from '@src/portal/LoginModal/LoginModal';
import { cartState } from '@src/recoil/cartState';
import { userState } from '@src/recoil/userState';
import React, { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useRecoilState, useRecoilValue } from 'recoil';
import { IconContainer, IconNumber, IconTitle } from '../IconContainerStyle';

const ShoppingCartIcon = () => {
  const push = usePushHistory();
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
  const userRecoil = useRecoilValue(userState);
  const [cartGoodsList, setCartGoodsList] = useRecoilState(cartState);

  const handlePushCart = useCallback(() => {
    push('/cart');
  }, [push]);

  const handleOpenModal = useCallback(() => {
    setOpenLoginModal(true);
  }, [setOpenLoginModal]);

  const handleCloseModal = useCallback(() => {
    setOpenLoginModal(false);
  }, [setOpenLoginModal]);

  useEffect(() => {
    const fetchCarts = async () => {
      const { result } = await getCarts();
      setCartGoodsList(result);
    };

    fetchCarts();
  }, [userRecoil]);

  return (
    <IconContainer onClick={userRecoil.isLoggedIn ? handlePushCart : handleOpenModal}>
      <AiOutlineShoppingCart size='1.5em' />
      {cartGoodsList.length > 0 && <IconNumber>{cartGoodsList.length}</IconNumber>}
      <IconTitle>장바구니</IconTitle>
      {openLoginModal && <LoginModal onClose={handleCloseModal} />}
    </IconContainer>
  );
};

export default ShoppingCartIcon;
