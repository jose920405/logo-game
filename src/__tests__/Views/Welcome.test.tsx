import React from 'react';
import { render } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

// Providers
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';

// Material Dependencies
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

// Configuration
import configureStore from '../../ReduxConfig/SetUpStore';

// Component
import { WelcomePage } from '../../Views/Welcome';

const { store } = configureStore();

const theme = createMuiTheme({});

describe('Welcome View', () => {

  const { getByText } = render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <WelcomePage />
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );

  test('Should render Correctly', () => {
    const el = getByText('Hello friend, tell me your name...');
    expect(el).toBeInTheDocument();
  });

  test('onClick ready button', () => {
    // TODO
  });
});
