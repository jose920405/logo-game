// Redux Utils
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// Reducer
import Game from '../../Reducers/Game/GameReducer';
import { reset_game, set_finish_exercise, set_score, set_user_name } from '../../Reducers/Game/GameActions';

import { defaultDropZonesInfo } from '../../Utils/Constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Game reducer', () => {
  it('Should change username', () => {
    const initialState: IGameReducerType = {
      dropZones: defaultDropZonesInfo,
      exerciseFinished: false,
      userName: '',
      score: 0,
    };

    const newName = 'jose';

    expect(Game(initialState, set_user_name(newName))).toEqual({
      ...initialState,
      userName: newName,
    });
  });

  it('Should change excercise finished', () => {
    const initialState: IGameReducerType = {
      dropZones: defaultDropZonesInfo,
      exerciseFinished: false,
      userName: '',
      score: 0,
    };

    const newExerciseFinished = true;

    expect(Game(initialState, set_finish_exercise(newExerciseFinished))).toEqual({
      ...initialState,
      exerciseFinished: newExerciseFinished,
    });
  });

  it('Should change score', () => {
    const initialState: IGameReducerType = {
      dropZones: defaultDropZonesInfo,
      exerciseFinished: false,
      userName: '',
      score: 0,
    };

    const newScore = 1;

    expect(Game(initialState, set_score(newScore))).toEqual({
      ...initialState,
      score: newScore,
    });
  });

  it('Reset Game should call 3 actions', async () => {
    const initialState: IGameReducerType = {
      dropZones: defaultDropZonesInfo,
      exerciseFinished: true,
      userName: 'jose',
      score: 4,
    };

    const expectedActions = [
      { type: 'game/SET_DROPZONES', value: defaultDropZonesInfo },
      { type: 'game/SET_FINISH_EXERCISE', value: false },
      { type: 'game/SET_SCORE', value: 0 }
    ];

    const store = mockStore({ game: initialState });

    await store.dispatch(reset_game() as any);
    expect(store.getActions()).toEqual(expectedActions);
  });
});