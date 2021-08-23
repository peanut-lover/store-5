import React, { useLayoutEffect } from 'react';

// 고차 컴포넌트 패턴입니다(https://reactjs-kr.firebaseapp.com/docs/higher-order-components.html)
// 컴포넌트 마운트 시점에 window의 스크롤을 최상단으로 이동합니다.
const withScrollToTopOnMount = (WrappedComponent: React.FC) => {
  const EnhancedComponent: React.FC = ({ children }) => {
    useLayoutEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    return <WrappedComponent children={children} />;
  };

  return EnhancedComponent;
};

export default withScrollToTopOnMount;
