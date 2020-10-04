import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Libraries
import { map, shuffle } from 'lodash';

// Material Components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Components
import DragBox from '../DragBox';
import DropBox from '../DropBox';

// Styles
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';

// Images
import imageZ from '../../Images/Letters/zoovu-z.svg';
import imageO from '../../Images/Letters/zoovu-o.svg';
import imageV from '../../Images/Letters/zoovu-v.svg';
import imageU from '../../Images/Letters/zoovu-u.svg';
import { useSelector } from 'react-redux';

const images = shuffle([imageZ, imageO, imageO, imageV, imageU]);

function DraggableLettersZone() {
  const classes = useStyles();

  const dropZones = useSelector((state: IRootState) => state.game.dropZones);

  return (
    <DndProvider backend={HTML5Backend}>
      <Grid
        className={classes.block}
        container
        justify={'center'}
        alignItems={'center'}
        direction={'row'}
        spacing={3}
      >
        {map(images, (eachImage, index) => <DragBox key={index} image={eachImage} index={index} />)}
      </Grid>
      <Typography className={classes.captionText} variant='caption' color='inherit'>
        {`...and drop them to make the logo great again!`}
      </Typography>
      <Grid
        className={classes.block}
        container
        justify={'center'}
        alignItems={'center'}
        direction={'row'}
        spacing={3}
      >
        {map(dropZones, (eachDropZone, index) => {
          if (eachDropZone.image) {
            return (
              <DragBox key={index} image={eachDropZone.image} index={eachDropZone.dragIndex as number} fromDrop />
            );
          }

          return (
            <DropBox key={index} dropInfo={eachDropZone} />
          );
        })}
      </Grid>
    </DndProvider>
  );
}



const useStyles = makeStyles((theme: Theme) => ({
  block: {
    marginTop: theme.spacing(4),
  },
  captionText: {
    marginTop: theme.spacing(6),
    color: 'gray',
  },
}));

export default DraggableLettersZone;