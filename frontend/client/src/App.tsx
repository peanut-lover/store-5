import React from 'react';
import GlobalStyles from 'src/GlobalStyles';
import { Routes, Route } from './lib/CustomRouter';
import Main from './pages/Main/Main';

export default function App() {
  return (
    <>
      {/* TODO: Change Header Component */}
      <div>Header</div>
      <div>
        <Routes>
          <Route path='/'>
            <Main />
          </Route>
        </Routes>
      </div>
      <GlobalStyles />
    </>
  );
}
