import React from 'react';
import { useSelector } from 'react-redux';

// Material Components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Components
import DraggableLettersZone from '../Components/DraggableLettersZone';
import ScoreLabel from '../Components/ScoreLabelLC/ScoreLabelLCScene';

// Styles
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';

// Utils
import { history } from '../ReduxConfig/SetUpStore';

// Modules
// import { useSelector } from 'react-redux';

export function GamePage() {
  const classes = useStyles();

  //#region Helpers
  //#endregion Helpers

  //#region Reducer info
  const userName = useSelector((state: IRootState) => state.game.userName);
  if (!userName) {
    history.replace('/');
  }
  //#endregion Reducer Info

  //#region Handlers
  //#endregion Handlers

  return (
    <Grid container justify={'center'} className={classes.root} item direction={'column'}>
      <Grid container direction={'row'}>
        <Grid container item xs={12} sm={6}>
          <Typography className={classes.goodLookText} variant='h6' color='inherit'>
            {`Good Look, ${userName}`}
          </Typography>
        </Grid>
        <ScoreLabel />
      </Grid>
      <Grid container direction={'row'} className={classes.captionContainer} justify={'space-between'}>
        <Typography className={classes.captionText} variant='caption' color='inherit'>
          {`Pick up the right cards`}
        </Typography>
        <Typography className={classes.captionText} variant='caption' color='inherit'>
          {`The faster the better!`}
        </Typography>
      </Grid>
      <DraggableLettersZone />
    </Grid>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  goodLookText: {
    fontWeight: 600,
  },
  captionText: {
    color: 'gray',
  },
  captionContainer: {
    marginTop: theme.spacing(3),
  },
}));