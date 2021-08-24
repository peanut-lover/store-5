import useUserState from '@src/hooks/useUserState';
import { usePushToast } from '@src/lib/ToastProvider/ToastProvider';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import HeaderBottom from './HeaderBottom/HeaderBottom';
import HeaderTop from './HeaderTop/HeaderTop';

const Header = () => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [userRecoil, userRecoilDispatch] = useUserState();
  const [isScrolled, setIsScrolled] = useState(false);
  const pushToast = usePushToast();

  const handleLogout = useCallback(async () => {
    try {
      await userRecoilDispatch({ type: 'LOGOUT' });
    } catch (err) {
      pushToast({ text: '로그아웃 도중 서버 오류가 발생했습니다.' });
    }
  }, [userRecoilDispatch]);

  useEffect(() => {
    const observerHandler: IntersectionObserverCallback = (entries) => {
      if (!entries[0].isIntersecting) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    const observer = new IntersectionObserver(observerHandler);
    observer.observe(sentinelRef.current as HTMLElement);
  }, []);

  async function checkLoggedIn() {
    try {
      await userRecoilDispatch({ type: 'CHECK' });
    } catch (err) {
      pushToast({ text: '로그인 도중 서버 오류가 발생했습니다.' });
    }
  }

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <>
      <Sentinel ref={sentinelRef} isScrolled={isScrolled} />
      <HeaderContainer isScrolled={isScrolled}>
        <HeaderTop userName={userRecoil.name} onLogout={handleLogout} />
        <HeaderBottom />
      </HeaderContainer>
    </>
  );
};

type HeaderContainerProp = {
  isScrolled?: boolean;
};

const ScrolledStyle = css`
  position: sticky;
  height: 10vh;
`;

const Sentinel = styled.div<HeaderContainerProp>`
  position: ${(props) => (props.isScrolled ? 'relative' : 'absolute')};
  height: ${(props) => (props.isScrolled ? '0vh' : '4vh')};
  top: 0;
  left: 0;
  right: 0;
  background-color: transparent;
`;

const HeaderContainer = styled.header<HeaderContainerProp>`
  position: relative;
  top: 0;
  width: 100%;
  min-width: 1280px;
  height: 13vh;
  margin: auto;
  z-index: 5;
  background-color: #fff;
  ${(props) => (props.isScrolled ? ScrolledStyle : '')};
`;

export default Header;
