import Header from '@src/components/Header/Header';
import React from 'react';
import Main from '../src/pages/Main';

import { Routes, Router, Route, Link, useParams } from './lib/CustomRouter';

export default function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/'>
            <Main />
          </Route>
        </Routes>
      </Router>
    </>
  );
}
