import React from 'react';
import GlobalStyles from './GlobalStyles';
import { Routes, Route, Router } from './lib/CustomRouter';
import Cart from './pages/Cart/CartPage';
import Order from './pages/Order/OrderPage';
import Main from './pages/Main/Main';
import Header from '@src/components/Header/Header';
import Goods from './pages/GoodsDetail/GoodsDetailPage';

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
        </Routes>
      </Router>
      <GlobalStyles />
    </>
  );
}
