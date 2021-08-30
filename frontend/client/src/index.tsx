import React from 'react';
import ReactDOM from 'react-dom';
import theme from './theme/theme';
import App from './App';
import Helmet from 'react-helmet';
import ToastProvider from './lib/ToastProvider/ToastProvider';
import { ThemeProvider } from 'styled-components';
import { RecoilRoot } from 'recoil';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <RecoilRoot>
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <Helmet>
          <link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap'></link>
        </Helmet>
        <App />
      </ToastProvider>
    </ThemeProvider>
  </RecoilRoot>,
  rootElement
);
