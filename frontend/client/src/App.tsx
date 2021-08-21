import React from 'react';
import GlobalStyles from './GlobalStyles';
import { Routes, Route, Router } from './lib/CustomRouter';
import Header from '@src/components/Header/Header';
import Cart from './pages/Cart/CartPage';
import Order from './pages/Order/OrderPage';
import Main from './pages/Main/Main';
import Goods from './pages/GoodsDetail/GoodsDetailPage';
import MyPage from './pages/MyPage/MyPage';
import CategoryGoods from '@src/pages/CategoryGoods/CategoryGoods';
import KeywordGoods from './pages/KeywordGoods/KeywordGoods';
import withLoggedIn from './utils/withLoggedIn';

export default function App() {
  const CartPageWithLoggedIn = withLoggedIn(Cart);
  const OrderPageWithLoggedIn = withLoggedIn(Order);
  const MyPageWithLoggedIn = withLoggedIn(MyPage);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/cart'>
            <CartPageWithLoggedIn />
          </Route>
          <Route path='/order'>
            <OrderPageWithLoggedIn />
          </Route>
          <Route path='/detail/:id'>
            <Goods />
          </Route>
          <Route path='/mypage'>
            <MyPageWithLoggedIn />
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
      </Router>
      <GlobalStyles />
    </>
  );
}
