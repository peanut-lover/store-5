import React, { useCallback, useState } from 'react';
import { Link } from '../../../lib/CustomRouter';

const HELLO = '안녕하세요!';

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
  );
};

export default HeaderTop;
