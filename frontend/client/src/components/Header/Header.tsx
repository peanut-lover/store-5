import useUserState from '@src/hooks/useUserState';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import HeaderBottom from './HeaderBottom/HeaderBottom';
import HeaderTop from './HeaderTop/HeaderTop';

const Header = () => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [userRecoil, userRecoilDispatch] = useUserState();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleLogout = useCallback(async () => {
    await userRecoilDispatch({ type: 'LOGOUT' });
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

  useEffect(() => {
    async function checkLoggedIn() {
      await userRecoilDispatch({ type: 'CHECK' });
    }
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
  min-width: 1200px;
  height: 13vh;
  margin: auto;
  z-index: 5;
  background-color: #fff;
  ${(props) => (props.isScrolled ? ScrolledStyle : '')};
`;

export default Header;
