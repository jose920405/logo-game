import { mount } from 'enzyme';

import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { act } from 'react-dom/test-utils';

// Material Provider
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import { SnackbarProvider } from 'notistack';

// Reducer
import GameReducer from '../../Reducers/Game/GameReducer';

// Component
import { WelcomePage } from '../../Views/Welcome';

const theme = createMuiTheme({});

const reducers = combineReducers({
  game: GameReducer,
});

const store: any = createStore(reducers, applyMiddleware(thunk));

describe('Welcome Page', () => {

  const mountComponent = mount(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <SnackbarProvider>
          <WelcomePage />
        </SnackbarProvider>
      </Provider>
    </ThemeProvider>
  );

  const simulateClickLetsGoButton = (expectedName: string) => {
    const letsBtn: any = mountComponent.find('#letsBtn').last();

    act(() => {
      letsBtn.props().onClick();
    });

    const gameReducer = mountComponent.props().children.props.store.getState().game;
    expect(gameReducer.userName).toBe(expectedName);
  };

  test('Should render Correctly', () => {
    const welcomeText = mountComponent.find('#welcomeText').last();
    expect(welcomeText.props().children).toContain('Hello friend, tell me your name...');
  });

  test('Press Lets Go Button', () => {
    simulateClickLetsGoButton('');
  });

  test('Fill userName textInput', () => {
    let userInput: any = mountComponent.find('#userInput').last();
    const userName = 'Jose';

    act(() => {
      userInput.props().onChange({ target: { value: userName } } as React.ChangeEvent<HTMLInputElement>);
    });

    mountComponent.update();

    userInput = mountComponent.find('#userInput').last();
    expect(userInput.props().value).toBe(userName);
  });

  test('Press Lets Go Button', () => {
    simulateClickLetsGoButton('Jose');
  });
});