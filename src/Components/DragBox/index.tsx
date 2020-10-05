import React from 'react';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';

// Libraries
import { cloneDeep, findIndex } from 'lodash';
import { useSnackbar } from 'notistack';

// Material Components
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

// Styles
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';

// Actions
import { set_dropzones, set_score } from '../../Reducers/Game/GameActions';

interface BoxProps {
  imageInfo: {
    img: string;
    letter: string;
  };
  index: number;
  fromDrop?: boolean;
}

// tslint:disable-next-line: variable-name
const DragBox: React.FC<BoxProps> = ({ fromDrop, imageInfo, index }) => {
  const classes = useStyles();

  const dropZones = useSelector((state: IRootState) => state.game.dropZones);
  const score = useSelector((state: IRootState) => state.game.score);

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [{ isDragging }, drag] = useDrag({
    item: { index, type: 'box', image: imageInfo.img, letter: imageInfo.letter, fromDrop },
    begin: (monitor: DragSourceMonitor) => {
      if (score === 0) {
        dispatch(set_score(1));
      }
    },
    end: (dragItem, monitor: DragSourceMonitor) => {
      const dropResult = monitor.getDropResult();
      if (dragItem && dropResult) {
        const cloneZones = cloneDeep(dropZones);

        const itemIndex = dragItem.index;
        if (dragItem.fromDrop) {
          const oldDropIndex = findIndex(cloneZones, { dragIndex: itemIndex });
          cloneZones[oldDropIndex] = { dropIndex: cloneZones[oldDropIndex].dropIndex, validLetter: cloneZones[oldDropIndex].validLetter };
        }

        const dropIndex: number = dropResult.index;

        if (dragItem.letter !== cloneZones[dropIndex].validLetter) {
          dispatch(set_score(score + 10));
          enqueueSnackbar('Invalid Position: 10 seconds penalti', { variant: 'error' });
        }

        cloneZones[dropIndex] = {
          ...cloneZones[dropIndex],
          dragIndex: dragItem.index,
          dragLetter: dragItem.letter,
          image: dragItem.image,
        };

        dispatch(set_dropzones(cloneZones));
      }
    },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  });

  const opacity = isDragging ? 0.4 : 1;

  return (
    <Grid ref={drag} className={classes.dragContainer} style={{ opacity }} item>
      <Paper elevation={5} className={classes.paperContainer}>
        <img className={classes.letterImg} src={imageInfo.img} alt={'img'} />
      </Paper>
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  dragContainer: {
    cursor: 'move',
    marginTop: theme.spacing(4),
  },
  letterImg: {
    width: 100,
    height: 100,
  },
  paperContainer: {
    padding: theme.spacing(5),
  },
}));

export default DragBox;