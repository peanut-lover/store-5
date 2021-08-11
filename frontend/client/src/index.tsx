import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from './lib/CustomRouter';

import App from './App';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  rootElement
);
