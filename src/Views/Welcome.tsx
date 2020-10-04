import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
import { history } from '../ReduxConfig/SetUpStore';

// Actions
import { set_user_name } from '../Reducers/Game/GameActions';

export function WelcomePage() {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const [textName, setTextName] = useState('');

  //#region Functions
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

  // const greet = () => console.log('Hello World!');
  // const debouncedGreet = debounce(greet, 3000);
  // for (let i = 0; i < 10; i++) {
  //   debouncedGreet();
  // }

  //#region Handlers
  const handleUserTextChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setTextName(event.target.value);
  };

  const onClickLetsGo = () => {
    if (!textName) {
      return enqueueSnackbar('Please add your name', { variant: 'warning' });
    }

    dispatch(set_user_name(textName));
    history.push('/game');
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
        <Typography className={classes.helloFriend} variant='h6' color='inherit'>
          {`Hello friend, tell me your name...`}
        </Typography>
        <TextField className={classes.userInput} placeholder={'Your name here'} value={textName} onChange={handleUserTextChange} />
        <Button className={classes.letsGoBtn} variant={'outlined'} onClick={onClickLetsGo}>{`Let's go ->`}</Button>
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