import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

// Material Provider
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
const theme = createMuiTheme({});

import { SnackbarProvider } from 'notistack';

import rootReducer from './ReduxConfig/combineReducers';

function render(
  ui: any,
  {
    initialState,
    store = createStore(rootReducer, initialState),
    ...renderOptions
  }: any = {}
) {
  function Wrapper({ children }: any) {
    return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <SnackbarProvider>
            {children}
          </SnackbarProvider>
        </Provider>
      </ThemeProvider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';

export { render };