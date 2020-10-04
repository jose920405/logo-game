// Libraries
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { Route, Router } from 'react-router-dom';

// Modules
import { withRoot } from './MaterialContainer';

// Styles
import './App.css';

// Setup
import { history } from './ReduxConfig/SetUpStore';

// Views
import { GamePage } from './Views/Game';
import { WelcomePage } from './Views/Welcome';

function Routes() {
  return (
    <React.Fragment>
      <Route exact={true} path='/' component={WelcomePage} />
      <Route exact={true} path='/game' component={GamePage} />
    </React.Fragment>
  );
}

function App() {
  return (
    <Router history={history}>
      <SnackbarProvider maxSnack={3} >
        <Routes />
      </SnackbarProvider>
    </Router>
  );
}

export default withRoot(App);
