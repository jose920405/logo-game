import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

// Material Components
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

// Styles
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';

// Utils
import Colors from '../Utils/Colors';

// Actions
import { set_user_name } from '../Reducers/Game/GameActions';
import History from '../Utils/History';

export function WelcomePage() {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const [textName, setTextName] = useState('');

  //#region Functions
/**
 * I didn't find a place when debounce should be used
 * Maybe on drag events but react DnD make this really good and events and dispatched only when is necessary.
 * anyway i use debounce from lodash, but here is an example of the debounce.
 */
  // const debounce = (callback: any, delay = 250) => {
  //   let timeoutId: any = null;
  //   return (...args: any) => {
  //     clearTimeout(timeoutId);
  //     timeoutId = setTimeout(() => {
  //       timeoutId = null;
  //       callback(...args);
  //     }, delay);
  //   };
  // };
  //#endregion Functions

  //#region Handlers
  const handleUserTextChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setTextName(event.target.value);
  };

  const onClickLetsGo = () => {
    if (!textName) {
      return enqueueSnackbar('Please add your name', { variant: 'warning' });
    }

    dispatch(set_user_name(textName));
    History.push('/game');
  };
  //#endregion Handlers

  return (
    <Grid className={classes.root} container justify={'center'} alignContent={'center'}>
      <Grid
        container
        justify={'center'}
        alignItems={'center'}
        direction={'column'}
        item
        lg={4}
        md={6}
        sm={8}
        xs={10}
      >
        <Typography id={'welcomeText'} className={classes.helloFriend} variant='h6' color='inherit'>
          {`Hello friend, tell me your name...`}
        </Typography>
        <TextField id={'userInput'} className={classes.userInput} placeholder={'Your name here'} value={textName} onChange={handleUserTextChange} />
        <Button id={'letsBtn'} className={classes.letsGoBtn} variant={'outlined'} onClick={onClickLetsGo}>{`Let's go ->`}</Button>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
  },
  helloFriend: {
    fontWeight: 600,
  },
  userInput: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    width: '60%',
  },
  letsGoBtn: {
    width: '40%',
    color: Colors.blueApp,
    borderColor: Colors.blueApp,
    borderRadius: 12,
  },
}));