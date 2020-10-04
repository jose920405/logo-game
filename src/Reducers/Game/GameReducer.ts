// Libraries
import { cloneDeep } from 'lodash';
import { Reducer } from 'redux';

// Reducer Utils
import GameActionTypes from './GameActionTypes';

const inmutableState: IGameReducerType = {
  lastAction: null as any,
  userName: '',
  score: 0,
  dropZones: [{ dropIndex: 0 }, { dropIndex: 1 }, { dropIndex: 2 }, { dropIndex: 3 }, { dropIndex: 4 }],
};

const initialState = cloneDeep(inmutableState);

const reducer: Reducer<IGameReducerType, IAction> = (state = initialState, action: IAction): IGameReducerType => {
  switch (action.type) {
    case GameActionTypes.SET_LAST_ACTION_GAME:
      return {
        ...state,
        lastAction: action.value,
      };
    case GameActionTypes.SET_USER_NAME:
      return {
        ...state,
        userName: action.value,
      };
    case GameActionTypes.SET_SCORE:
      return {
        ...state,
        score: action.value,
      };
    case GameActionTypes.SET_DROPZONES:
      return {
        ...state,
        dropZones: action.value,
      };
    case GameActionTypes.CLEAR_REDUCER:
      return cloneDeep(inmutableState);
    default:
      return state;
  }
};

export default reducer;
