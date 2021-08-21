import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '@src/recoil/userState';
import { usePushHistory } from '@src/lib/CustomRouter';

// 고차 컴포넌트 패턴입니다(https://reactjs-kr.firebaseapp.com/docs/higher-order-components.html)
// 로그인 여부를 확인하고, 비로그인 시 위치를 이동하는 로직이 부여된 컴포넌트를 반환합니다.
const withLoggedIn = (WrappedComponent: React.FC) => {
  const EnhancedComponent: React.FC = ({ children }) => {
    const { isLoggedIn } = useRecoilValue(userState);
    const pushHistory = usePushHistory();

    useEffect(() => {
      if (!isLoggedIn) {
        pushHistory('/');
      }
    }, [isLoggedIn]);

    if (!isLoggedIn) {
      return null;
    }

    return <WrappedComponent children={children} />;
  };

  return EnhancedComponent;
};

export default withLoggedIn;
