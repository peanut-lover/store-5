import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import HeaderBottom from './HeaderBottom/HeaderBottom';
import HeaderTop from './HeaderTop/HeaderTop';

const Header = () => {
  const headerRef = useRef<HTMLHeadElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <>
      <Sentinel ref={sentinelRef} isScrolled={isScrolled} />
      <HeaderContainer ref={headerRef} isScrolled={isScrolled}>
        <HeaderTop userName={''} />
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
  height: 8vh;
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
  min-width: 1080px;
  height: 13vh;
  margin: auto;
  z-index: 5;
  background-color: #fff;
  ${(props) => (props.isScrolled ? ScrolledStyle : '')};
`;

export default Header;
