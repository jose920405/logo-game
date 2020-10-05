import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Material
import { WithStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

// Component
import ScoreLabel from '.';

// Actions
import { reset_game, set_score } from '../../Reducers/Game/GameActions';

// Styles
import Styles from './Styles';

//#region TS Interfaces and Types
interface IOwnProps {
  theme?: Theme; // Prop inject in withStyles->withTheme
  width?: Breakpoint;
}
type TMapStateToProps = ReturnType<typeof mapStateToProps>;
type TMapDispatchToProps = ReturnType<typeof mapDispatchToProps>;

export type ScoreLabelProps = IOwnProps & TMapStateToProps & TMapDispatchToProps & WithStyles<typeof Styles>;
//#endregion TS Interfaces and Types

const mapStateToProps = (state: IRootState) => {
  return {
    exerciseFinished: state.game.exerciseFinished,
    score: state.game.score,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatchType) => bindActionCreators({
  // GameActions
  reset_game,
  set_score,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ScoreLabel);
