import React, { useCallback, useState } from 'react';
<<<<<<< HEAD
import styled from 'styled-components';
=======
>>>>>>> 7eda423 (add: 헤더 아웃라인)
import { Link } from '../../../lib/CustomRouter';

const HELLO = '안녕하세요!';

<<<<<<< HEAD
const Top = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 35%;
  padding: 0 15% 0 15%;
  color: gray;
`;

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
`;

const UserContainer = styled.div`
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

const Button = styled.button`
  background-color: transparent;
  border: none;
  color: gray;
`;

=======
>>>>>>> 7eda423 (add: 헤더 아웃라인)
const HeaderTop: React.FC<{ userName: string }> = ({ userName }) => {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const onClickLogout = useCallback(() => {
    setOpenLogoutModal(true);
  }, []);
  const onClickLogin = useCallback(() => {
    setOpenLoginModal(true);
  }, []);

  return (
<<<<<<< HEAD
    <Top>
      {!userName ? (
        <Container>
          <UserContainer>
            <UserName>{`${userName}님,`}</UserName>
            <span>{HELLO}</span>
          </UserContainer>
          <Link to='/admin'>관리자페이지</Link>
          <Button onClick={onClickLogout}>로그아웃</Button>
        </Container>
      ) : (
        <Button onClick={onClickLogin}>로그인</Button>
      )}
      {/* {openLoginModal && } */}
      {/* {openLogoutModal &&} */}
    </Top>
=======
    <div>
      {userName ? (
        <div>
          <div>
            <span>{`${userName}님,`}</span>
            <span>{HELLO}</span>
          </div>
          <Link to="/admin">관리자페이지</Link>
          <button onClick={onClickLogout}>로그아웃</button>
        </div>
      ) : (
        <button onClick={onClickLogin}>로그인</button>
      )}
      {/* {openLoginModal && } */}
      {/* {openLogoutModal &&} */}
    </div>
>>>>>>> 7eda423 (add: 헤더 아웃라인)
  );
};

export default HeaderTop;
