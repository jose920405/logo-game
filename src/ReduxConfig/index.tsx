import * as React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// Main Component
import App from '../App';

// Configuration
import configureStore from './SetUpStore';

const { persistor, store } = configureStore();

export function ReduxRoot() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<label>Loading...</label>}
        persistor={persistor}
      >
        <App />
      </PersistGate>
    </Provider>
  );
}