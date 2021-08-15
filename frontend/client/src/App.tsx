import React from 'react';
import GlobalStyles from './GlobalStyles';
import { Routes, Route, Router } from './lib/CustomRouter';
import Header from '@src/components/Header/Header';
import Cart from './pages/Cart/CartPage';
import Order from './pages/Order/OrderPage';
import Main from './pages/Main/Main';
import CategoryGoodsList from './pages/CategoryGoodsList/CategoryGoodsList';
import Goods from './pages/GoodsDetail/GoodsDetailPage';
import MyPage from './pages/MyPage/MyPage';

export default function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes exact>
          <Route path='/'>
            <Main />
          </Route>
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
            <CategoryGoodsList />
          </Route>
        </Routes>
      </Router>
      <GlobalStyles />
    </>
  );
}
