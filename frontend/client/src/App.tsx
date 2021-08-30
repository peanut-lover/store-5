import React from 'react';
import { Routes, Route, Router } from './lib/CustomRouter';
import GlobalStyles from './GlobalStyles';
import Header from './components/Header/Header';
import CategoryGoods from './pages/CategoryGoods/CategoryGoods';
import SideBar from './components/SideBar/SideBar';
import Footer from './components/Footer/Footer';
import Cart from './pages/Cart/CartPage';
import Order from './pages/Order/OrderPage';
import Main from './pages/Main/Main';
import Goods from './pages/GoodsDetail/GoodsDetailPage';
import MyPage from './pages/MyPage/MyPage';
import KeywordGoods from './pages/KeywordGoods/KeywordGoods';

import styled from 'styled-components';

export default function App() {
  return (
    <>
      <Router>
        <Header />
        <ContentContainer>
          <Routes>
            <Route path='/cart'>
              <Cart />
            </Route>
            <Route path='/order'>
              <Order />
            </Route>
            <Route path='/detail/:id'>
              <Goods />
            </Route>
            <Route path='/mypage'>
              <MyPage />
            </Route>
            <Route path='/category/:category'>
              <CategoryGoods />
            </Route>
            <Route path='/keyword/:keyword'>
              <KeywordGoods />
            </Route>
            <Route path='/'>
              <Main />
            </Route>
          </Routes>
        </ContentContainer>
        <SideBar />
        <FooterContainer>
          <Footer />
        </FooterContainer>
      </Router>
      <GlobalStyles />
    </>
  );
}

interface FooterContainerProps {
  theme: {
    dustWhite: string;
  };
}

const FooterContainer = styled.div<FooterContainerProps>`
  min-width: 1280px;
  @media (max-width: 1280px) {
    width: 100%;
  }
  height: 20vh;
  background-color: ${(props) => props.theme.dustWhite};
`;

const ContentContainer = styled.div`
  width: 100%;
  min-height: 70vh;
`;
