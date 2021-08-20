import Header from '@src/components/Header/Header';
import React from 'react';
import Main from './pages/Main/Main';

import { Routes, Router, Route, Link, useParams } from './lib/CustomRouter';
import GoodsAdmin from '@src/pages/GoodsAdmin/GoodsAdmin';
import PromotionAdmin from '@src/pages/PromotionAdmin/PromotionAdmin';
import OrderAdmin from '@src/pages/OrderAdmin/OrderAdmin';

export default function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/'>
            <PromotionAdmin />
          </Route>
          <Route path='/admin'>
            <Routes>
              <Route path='/admin/goods'>
                <GoodsAdmin />
              </Route>
              <Route path='/admin/order'>
                <OrderAdmin />
              </Route>
              <Route path='/admin/promotion'>
                <PromotionAdmin />
              </Route>
              <Route path='/admin'>
                <Main />
              </Route>
            </Routes>
          </Route>
        </Routes>
      </Router>
    </>
  );
}
