import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Libraries
import { each } from 'lodash';
import { useSnackbar } from 'notistack';

// Material Components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Material Styles
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';

// Components
import DraggableLettersZone from '../Components/DraggableLettersZone';
import ScoreLabel from '../Components/ScoreLabelLC/ScoreLabelLCScene';

// Actions
import { set_finish_exercise } from '../Reducers/Game/GameActions';

// Utils
import History from '../Utils/History';

export function GamePage() {
  const classes = useStyles();

  //#region Reducer info
  const userName = useSelector((state: IRootState) => state.game.userName);
  const dropZones = useSelector((state: IRootState) => state.game.dropZones);
  const score = useSelector((state: IRootState) => state.game.score);

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  if (!userName) {
    History.replace('/');
  }
  //#endregion Reducer Info

  //#region Functions
  useEffect(() => {

    const validateResult = () => {
      let allCardPlaced = true;
      let successResult = true;
      each(dropZones, (dropZone) => {
        if (!dropZone.image) {
          allCardPlaced = false;
          return false; // break loop
        }

        if (dropZone.dragLetter !== dropZone.validLetter) {
          successResult = false;
        }
      });

      if (allCardPlaced) {
        if (successResult) {
          enqueueSnackbar(`Great. The order is correct. You score was: ${score}`, { variant: 'success' });
        } else {
          enqueueSnackbar(`Sorry. The order is wrong. You score was: ${score}`, { variant: 'error' });
        }

        dispatch(set_finish_exercise(true));
      }
    };

    validateResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropZones]);
  //#endregion Functions

  return (
    <Grid container justify={'center'} className={classes.root} item direction={'column'}>
      <Grid container direction={'row'}>
        <Grid container item xs={12} sm={6}>
          <Typography id={'goodLuck'} className={classes.goodLookText} variant='h6' color='inherit'>
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