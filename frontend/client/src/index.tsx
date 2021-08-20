import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { RecoilRoot } from 'recoil';
import theme from './theme/theme';
import App from './App';
import ToastProvider from './lib/ToastProvider/ToastProvider';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <RecoilRoot>
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <App />
      </ToastProvider>
    </ThemeProvider>
  </RecoilRoot>,
  rootElement
);
