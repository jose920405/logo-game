import { createHashHistory } from 'history';

let history: any;

if (typeof document !== 'undefined') {
  history = createHashHistory();
}

export default history;
