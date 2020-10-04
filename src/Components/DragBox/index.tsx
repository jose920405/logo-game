import React from 'react';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';

// Libraries
import { cloneDeep, findIndex } from 'lodash';

// Material Components
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

// Styles
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';

// Actions
import { set_dropzones } from '../../Reducers/Game/GameActions';

interface BoxProps {
  image: string;
  index: number;
  fromDrop?: boolean;
}

// tslint:disable-next-line: variable-name
const DragBox: React.FC<BoxProps> = ({ fromDrop, image, index }) => {
  const classes = useStyles();

  const dropZones = useSelector((state: IRootState) => state.game.dropZones);
  const dispatch = useDispatch();


  const [{ isDragging }, drag] = useDrag({
    item: { index, type: 'box', image, fromDrop },
    end: (dragItem: any, monitor: DragSourceMonitor) => {
      const dropResult = monitor.getDropResult();
      if (dragItem && dropResult) {
        const cloneZones = cloneDeep(dropZones);

        const itemIndex = dragItem.index;
        if (dragItem.fromDrop) {
          const oldDropIndex = findIndex(cloneZones, { dragIndex: itemIndex });
          cloneZones[oldDropIndex] = { dropIndex: cloneZones[oldDropIndex].dropIndex };
        }

        const dropIndex: number = dropResult.index;
        cloneZones[dropIndex] = {
          ...cloneZones[dropIndex],
          dragIndex: dragItem.index,
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
        <img className={classes.letterImg} src={image} alt={'img'} />
      </Paper>
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  dragContainer: {
    cursor: 'move',
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