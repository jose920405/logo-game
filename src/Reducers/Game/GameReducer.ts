// Libraries
import { cloneDeep } from 'lodash';
import { Reducer } from 'redux';

// Utils
import { defaultDropZonesInfo } from '../../Utils/Constants';

// Reducer Utils
import GameActionTypes from './GameActionTypes';

const inmutableState: IGameReducerType = {
  dropZones: defaultDropZonesInfo,
  exerciseFinished: false,
  userName: '',
  score: 0,
};

const initialState = cloneDeep(inmutableState);

const reducer: Reducer<IGameReducerType, IAction> = (state = initialState, action: IAction): IGameReducerType => {
  switch (action.type) {
    case GameActionTypes.SET_DROPZONES:
      return {
        ...state,
        dropZones: action.value,
      };
    case GameActionTypes.SET_FINISH_EXERCISE:
      return {
        ...state,
        exerciseFinished: action.value,
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
    case GameActionTypes.CLEAR_REDUCER:
      return cloneDeep(inmutableState);
    default:
      return state;
  }
};

export default reducer;
