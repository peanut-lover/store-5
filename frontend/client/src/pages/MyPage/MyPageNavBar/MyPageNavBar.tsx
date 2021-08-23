import HighlightedText from '@src/components/HighlightedText/HighlightedText';
import useUserState from '@src/hooks/useUserState';
import NavItem from '@src/pages/MyPage/MyPageNavBar/NavItem';
import SubNav from '@src/pages/MyPage/MyPageNavBar/SubNav';
import React from 'react';
import styled from 'styled-components';

const MyPageNavBar = () => {
  return (
    <div>
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
    </div>
  );
};

const UserNameLabel = styled.div`
  text-align: start;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
`;

export default MyPageNavBar;
