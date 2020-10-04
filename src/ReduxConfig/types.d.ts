// Libraries
import { ThunkDispatch } from 'redux-thunk';

// Actions Dispatches Definitions
import GameActionTypes from '../Reducers/Game/GameActionTypes';

declare global {
  interface IAction {
    type: GameActionTypes;
    value?: any;
    payload?: any;
  }

  interface IRootState {
    game: IGameReducerType;
  }

  type IThunkResult<R = void> = (
    dispatch: IThunkDispatch,
    getState: () => IRootState,
    extraArgument: any,
  ) => R;

  type IThunkDispatch = (obj: IAction | IThunkResult) => void;
  type ThunkDispatchType = ThunkDispatch<IRootState, void, IAction>;
}