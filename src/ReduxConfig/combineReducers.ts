import { combineReducers } from 'redux';

// Reducers
import game from '../Reducers/Game/GameReducer';

export default combineReducers<IRootState>({
  game,
});
