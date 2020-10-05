import React from 'react';
import { compose } from 'recompose';

// Material Comps
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withWidth from '@material-ui/core/withWidth';

// Material Styles
import { withStyles } from '@material-ui/core';
import Styles from './Styles';

// Images
import clock from '../../Images/clock.svg';

// Props
import { ScoreLabelProps } from './ScoreLabelLCScene';

class ScoreLabelLC extends React.Component<ScoreLabelProps> {
  private interval: any = null;

  //#region LifeCycle
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  shouldComponentUpdate(nextProps: ScoreLabelProps) {
    if (nextProps.score !== this.props.score || nextProps.exerciseFinished !== this.props.exerciseFinished) {
      return true;
    }

    return false;
  }

  componentDidUpdate(prevProps: ScoreLabelProps) {
    if (this.props.score === 1) {
      this.startInterval();
    }

    if (!prevProps.exerciseFinished && this.props.exerciseFinished) {
      clearInterval(this.interval);
      setTimeout(() => {
        this.props.reset_game();
      }, 10000);
    }
  }
  //#endregion LifeCycle

  //#region Functions
  startInterval() {
    this.interval = setInterval(() => {
      const score = this.props.score;
      this.props.set_score(score + 1);
    }, 1000);
  }
  //#endregion Functions

  render() {
    const classes = this.props.classes;
    const score = this.props.score;

    return (
      <Grid container direction={'row'} item xs={12} sm={6} justify={this.props.width === 'xs' ? 'flex-start' : 'flex-end'} alignItems={'center'}>
        <img className={classes.clockIcon} src={clock} alt='clockIcon' />
        <Typography className={classes.scoreText} color='inherit'>
          {`Your score: ${score} seconds`}
        </Typography>
      </Grid>
    );
  }
}

export default compose(
  withWidth(),
  withStyles(Styles),
)(ScoreLabelLC);
