import React from 'react';
import Main from 'src/pages/Main';

import { Routes, Router, Route, Link, useParams } from './lib/CustomRouter';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/'>
          <Main />
        </Route>
      </Routes>
    </Router>
  );
}
