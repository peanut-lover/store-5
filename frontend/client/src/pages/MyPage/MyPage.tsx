import React from 'react';
import { Route, Routes } from '@src/lib/CustomRouter';
import styled from 'styled-components';

import MyPageNavBar from '@src/pages/MyPage/MyPageNavBar/MyPageNavBar';
import MyWishListView from '@src/pages/MyPage/MyWishListView/MyWishListView';
import MyAddressView from '@src/pages/MyPage/MyAddressView/MyAddressView';
import useUserState from '@src/hooks/useUserState';
import MyOrderListView from '@src/pages/MyPage/MyOrderListView/MyOrderListView';
import MyProfileView from '@src/pages/MyPage/MyProfileView/MyProfileView';
import HighlightedText from '@src/components/HighlightedText/HighlightedText';

import withLoggedIn from '@src/utils/withLoggedIn';

const MyPage = () => {
  const [user] = useUserState();

  if (!user || !user.isLoggedIn) {
    return <HighlightedText>로그인 부터.. 하셔야할 듯</HighlightedText>;
  }

  return (
    <MyPageContainer>
      <MyPageNavContainer>
        <MyPageNavBar />
      </MyPageNavContainer>
      <MyPageContentContainer>
        <Routes>
          <Route path='/mypage/order'>
            <MyOrderListView />
          </Route>
          <Route path='/mypage/address'>
            <MyAddressView />
          </Route>
          <Route path='/mypage/wish'>
            <MyWishListView />
          </Route>
          <Route path='/mypage'>
            <MyProfileView />
          </Route>
        </Routes>
      </MyPageContentContainer>
    </MyPageContainer>
  );
};

const MyPageContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
  margin-top: 100px;
  display: flex;
  justify-content: space-between;
`;
const MyPageNavContainer = styled.nav`
  min-width: 200px;
`;
const MyPageContentContainer = styled.main`
  min-width: 900px;
`;

export default withLoggedIn(MyPage);
