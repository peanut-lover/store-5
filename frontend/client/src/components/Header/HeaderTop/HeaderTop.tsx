import React, { RefObject, useCallback, useState } from 'react';
import styled from 'styled-components';
import { Link } from '@src/lib/CustomRouter/CustomRouter';
import LoginModal from '@src/portal/LoginModal/LoginModal';

const HELLO = '안녕하세요!';

interface Props {
  userName: string;
  onLogout: () => void;
}

const HeaderTop: React.FC<Props> = ({ userName, onLogout }) => {
  // TODO: 모달 연동
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const handleCloseLoginModal = useCallback(() => {
    setOpenLoginModal(false);
  }, []);

  const handleClickLogin = useCallback(() => {
    setOpenLoginModal(true);
  }, []);

  const handleClickLogout = useCallback(() => {
    onLogout();
  }, []);

  return (
    <HeaderTopContainer>
      {userName ? (
        <UserContentContainer>
          <ProfileContainer>
            <UserName>{`${userName}님,`}</UserName>
            <span>{HELLO}</span>
          </ProfileContainer>
          <Link to='/admin'>
            <Span>관리자페이지</Span>
          </Link>
          <Button onClick={handleClickLogout}>로그아웃</Button>
        </UserContentContainer>
      ) : (
        <Button onClick={handleClickLogin}>로그인</Button>
      )}
      {openLoginModal && <LoginModal onClose={handleCloseLoginModal} />}
    </HeaderTopContainer>
  );
};

const HeaderTopContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 35%;
  padding: 0 15% 0 15%;
  color: gray;
`;

const UserContentContainer = styled.div`
  box-sizing: border-box;
  display: flex;
`;

const ProfileContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 1em;
  margin-right: 1em;
  :not(:last-child) {
    border-right: 1px solid lightgray;
  }
`;

const UserName = styled.span`
  font-weight: 800;
`;

const Span = styled.span`
  line-height: 2em;
  padding-right: 1em;
  margin-right: 1em;
  border-right: 1px solid lightgray;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  color: gray;
  padding: 0;
  cursor: pointer;
`;

export default HeaderTop;
