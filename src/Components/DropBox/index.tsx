import React from 'react';
import { useDrop } from 'react-dnd';

// Material Components
import Grid from '@material-ui/core/Grid';

// Styles
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';

interface DropProps {
  dropInfo: IDropZone;
}

// tslint:disable-next-line: variable-name
const DropBox: React.FC<DropProps> = ({ dropInfo }) => {
  const classes = useStyles();

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'box',
    drop: () => ({ index: dropInfo.dropIndex }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = canDrop && isOver;

  return (
    <Grid ref={drop} className={classes.dropContainer} style={{ backgroundColor: isActive ? 'lightgray' : 'transparent' }} />
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  dropContainer: {
    border: '2px dashed gray',
    borderRadius: 6,
    width: 185,
    height: 185,
    marginRight: theme.spacing(3),
    marginTop: theme.spacing(4),
  },
}));

export default DropBox;