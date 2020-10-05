// Libraries
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';

// Modules
import { withRoot } from './MaterialContainer';

// Styles
import './App.css';

// Views
import { GamePage } from './Views/Game';
import { WelcomePage } from './Views/Welcome';

function Routes() {
  return (
    <Switch>
      <Route exact path='/' component={WelcomePage} />
      <Route exact path='/game' component={GamePage} />
    </Switch>
  );
}

function App() {
  return (
    <SnackbarProvider maxSnack={3} >
      <Router>
        <Routes />
      </Router>
    </SnackbarProvider>
  );
}

export default withRoot(App);
