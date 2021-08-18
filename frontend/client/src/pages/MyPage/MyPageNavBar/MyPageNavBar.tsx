import HighlightedText from '@src/components/HighlightedText/HighlightedText';
import useUserState from '@src/hooks/useUserState';
import NavItem from '@src/pages/MyPage/MyPageNavBar/NavItem';
import SubNav from '@src/pages/MyPage/MyPageNavBar/SubNav';
import React, { useState } from 'react';
import styled from 'styled-components';

const MyPageNavBar = () => {
  const [userRecoil] = useUserState();
  return (
    <div>
      <UserNameLabel>
        <HighlightedText>{userRecoil.name}</HighlightedText> <span> 님</span>
      </UserNameLabel>

      <SubNav>
        <NavItem name='내 정보' to={'/mypage'} />
        <NavItem name='주소(배송지)' to={'/mypage/address'} />
      </SubNav>
      <SubNav title='상품'>
        <NavItem name='찜 리스트' to={'/mypage/wish'} />
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
