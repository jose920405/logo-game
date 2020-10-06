import { mount } from 'enzyme';

import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

// Material Provider
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import { SnackbarProvider } from 'notistack';

// Reducer
import GameReducer from '../../Reducers/Game/GameReducer';
import { set_user_name } from '../../Reducers/Game/GameActions';

// Component
import { GamePage } from '../../Views/Game';
// import { ScoreLabelLC } from '../../Components/ScoreLabelLC';
import ScoreLabelLC from '../../Components/ScoreLabelLC/ScoreLabelLCScene';

const theme = createMuiTheme({});

const reducers = combineReducers({
  game: GameReducer,
});

const store: any = createStore(reducers, applyMiddleware(thunk));

describe('Game Page View', () => {
  const mountComponent = mount(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <SnackbarProvider>
          <GamePage />
        </SnackbarProvider>
      </Provider>
    </ThemeProvider>
  );

  test('Game render correctly', () => {
    const goodLuckTest = mountComponent.find('#goodLuck').last();
    expect(goodLuckTest.props().children).toContain('Good Look');
  });

  test('Good Look with userName', () => {
    store.dispatch(set_user_name('Jose'));
    mountComponent.update();

    const goodLuckTest = mountComponent.find('#goodLuck').last();
    expect(goodLuckTest.props().children).toContain('Jose');
  });

  test('ScoreLabel Rendering', () => {
    const scoreLabel = mountComponent.find(ScoreLabelLC);
    expect(scoreLabel).toBeDefined();
  });
});
