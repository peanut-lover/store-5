import HighlightedText from '@src/components/HighlightedText/HighlightedText';
import useUserState from '@src/hooks/useUserState';
import NavItem from '@src/pages/MyPage/MyPageNavBar/NavItem';
import SubNav from '@src/pages/MyPage/MyPageNavBar/SubNav';
import React from 'react';
import styled from 'styled-components';

const MyPageNavBar = () => {
  return (
    <MyPageNavBarContainer>
      <SubNav>
        <NavItem name='내 정보' to={'/mypage'} />
        <NavItem name='주소(배송지)' to={'/mypage/address'} />
      </SubNav>
      <SubNav title='상품'>
        <NavItem name='찜 리스트' to={'/mypage/wish'} />
      </SubNav>
      <SubNav title='주문/배송'>
        <NavItem name='내 주문' to={'/mypage/order'} />
      </SubNav>
    </MyPageNavBarContainer>
  );
};

const MyPageNavBarContainer = styled.div`
  animation: fadeInEffect 0.5s 0s;
  @keyframes fadeInEffect {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export default MyPageNavBar;
