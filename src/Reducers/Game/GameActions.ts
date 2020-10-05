// Libraries
import { batch } from 'react-redux';

// Utils
import { defaultDropZonesInfo } from '../../Utils/Constants';

import GameActionTypes from './GameActionTypes';

export const set_dropzones = (value: IDropZone[]): IAction => ({ type: GameActionTypes.SET_DROPZONES, value });
export const set_finish_exercise = (value: boolean): IAction => ({ type: GameActionTypes.SET_FINISH_EXERCISE, value });
export const set_score = (value: number): IAction => ({ type: GameActionTypes.SET_SCORE, value });
export const set_user_name = (value: string): IAction => ({ type: GameActionTypes.SET_USER_NAME, value });

export const reset_game = (): IThunkResult => {
  return async (dispatch) => {
    setTimeout(() => {
      batch(() => {
        dispatch(set_dropzones(defaultDropZonesInfo));
        dispatch(set_finish_exercise(false));
        dispatch(set_score(0));
      });
    }, 10000);
  };
};
