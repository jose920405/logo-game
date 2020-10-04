import GameActionTypes from './GameActionTypes';

export const set_last_action_game = (value: GameActionTypes): IAction => ({ type: GameActionTypes.SET_LAST_ACTION_GAME, value });
export const set_dropzones = (value: IDropZone[]): IAction => ({ type: GameActionTypes.SET_DROPZONES, value });
export const set_user_name = (value: string): IAction => ({ type: GameActionTypes.SET_USER_NAME, value });
export const set_score = (value: number): IAction => ({ type: GameActionTypes.SET_SCORE, value });

export const thunk_action = (): IThunkResult => {
  return async (dispatch, getState) => {
    // TODO
  };
};
