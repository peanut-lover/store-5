import React from 'react';

import { Routes, Router, Route, Link, useParams } from './lib/CustomRouter';
import Main from './pages/Main/Main';

export default function App() {
  return (
    <div>
      {/* TODO: Change Header Component */}
      <div>Header</div>
      <div>
        <Routes>
          <Route path='/'>
            <Main />
          </Route>
        </Routes>
      </div>
    </div>
  );
}
