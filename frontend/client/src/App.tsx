import React from 'react';
import GlobalStyles from './GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { Routes, Route } from './lib/CustomRouter';
import Main from './pages/Main/Main';
import theme from './theme/theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}
