import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { FaRegHandPointRight } from 'react-icons/fa';
import theme from '@src/theme/theme';
import { useRecoilValue } from 'recoil';
import { userState } from '@src/recoil/userState';
import LoginModal from '@src/portal/LoginModal/LoginModal';

const AdminFubButton = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const userRecoil = useRecoilValue(userState);

  const handleOpenModal = useCallback(() => {
    setOpenModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  const handleButtonClick = useCallback(() => {
    userRecoil.isLoggedIn ? (location.href = '/admin') : handleOpenModal();
  }, [userRecoil, handleOpenModal]);

  return (
    <>
      <FubButtonContainer color={theme.primary} onClick={handleButtonClick}>
        <FubButton color={theme.primary}>관리자 페이지</FubButton>
        <FaRegHandPointRight fontSize='1.7em' color={theme.primary} />
      </FubButtonContainer>
      {openModal && <LoginModal onClose={handleCloseModal} />}
    </>
  );
};

const FubButtonContainer = styled.div<{ color: string }>`
  position: fixed;
  display: flex;
  align-items: center;
  height: 5%;
  bottom: 5%;
  right: 3%;
  border-radius: 8px;
  border: 1px solid ${(props) => props.color};
  padding: 12px;
  cursor: pointer;
`;
const FubButton = styled.button<{ color: string }>`
  height: 100%;
  margin-right: 12px;
  border: none;
  background-color: transparent;
  color: ${(props) => props.color};
  font-size: 1.2em;
  cursor: pointer;
`;
export default AdminFubButton;
