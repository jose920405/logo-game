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

const images = shuffle([
  { img: imageZ, letter: 'z' },
  { img: imageO, letter: 'o' },
  { img: imageO, letter: 'o' },
  { img: imageV, letter: 'v' },
  { img: imageU, letter: 'u' }
]);

function DraggableLettersZone() {
  const classes = useStyles();

  const dropZones = useSelector((state: IRootState) => state.game.dropZones);

  return (
    <DndProvider backend={HTML5Backend}>
      <Grid
        container
        justify={'center'}
        alignItems={'center'}
        direction={'row'}
        spacing={3}
      >
        {map(images, (eachImage, index) => <DragBox key={index} imageInfo={eachImage} index={index} />)}
      </Grid>
      <Typography className={classes.captionText} variant='caption' color='inherit'>
        {`...and drop them to make the logo great again!`}
      </Typography>
      <Grid
        container
        justify={'center'}
        alignItems={'center'}
        direction={'row'}
        spacing={3}
      >
        {map(dropZones, (eachDropZone, index) => {
          if (eachDropZone.image) {
            return (
              <DragBox
                key={index}
                fromDrop
                imageInfo={{ img: eachDropZone.image, letter: eachDropZone.dragLetter as string }}
                index={eachDropZone.dragIndex as number}
              />
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
  captionText: {
    marginTop: theme.spacing(6),
    color: 'gray',
  },
}));

export default DraggableLettersZone;