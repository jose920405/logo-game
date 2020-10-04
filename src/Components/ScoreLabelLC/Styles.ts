import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

// Utils
import Colors from '../../Utils/Colors';

const styles = (theme: Theme) => createStyles({
  clockIcon: {
    width: 15,
    height: 15,
    color: 'yellow',
  },
  scoreText: {
    marginLeft: theme.spacing(1),
    color: Colors.blueApp,
  },
});

export default styles;
