import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { RecoilRoot } from 'recoil';
import theme from './theme/theme';
import App from './App';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <RecoilRoot>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </RecoilRoot>,
  rootElement
);
