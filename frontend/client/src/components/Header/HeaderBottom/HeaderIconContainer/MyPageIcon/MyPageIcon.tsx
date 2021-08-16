import { usePushHistory } from '@src/lib/CustomRouter/CustomRouter';
import LoginModal from '@src/portal/LoginModal/LoginModal';
import { userState } from '@src/recoil/userState';
import React, { useCallback, useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { useRecoilValue } from 'recoil';
import { IconContainer, IconTitle } from '../IconContainerStyle';

const MyPageIcon = () => {
  const userRecoil = useRecoilValue(userState);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const push = usePushHistory();
  const handlePushMyPage = useCallback(() => {
    push('/mypage');
  }, [push]);

  const handleOpenModal = useCallback(() => {
    setOpenLoginModal(true);
  }, [setOpenLoginModal]);

  const handleCloseModal = useCallback(() => {
    setOpenLoginModal(false);
  }, [setOpenLoginModal]);

  return (
    <IconContainer onClick={userRecoil.isLoggedIn ? handlePushMyPage : handleOpenModal}>
      <CgProfile size='1.5em' />
      <IconTitle>마이페이지</IconTitle>
      {openLoginModal && <LoginModal onClose={handleCloseModal} />}
    </IconContainer>
  );
};

export default MyPageIcon;
