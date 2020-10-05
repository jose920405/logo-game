import { applyMiddleware, compose, createStore } from 'redux';

//#region persist import block
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import createEncryptor from 'redux-persist-transform-encrypt';
import storage from 'redux-persist/lib/storage';
//#endregion persist import block

import thunk from 'redux-thunk';

import rootReducer from './combineReducers';

export const configureStore = (initialState?: IRootState) => {
  const enhancer = compose(
    applyMiddleware(thunk),
  );

  //#region Persist Logic
  const encryptor = createEncryptor({
    secretKey: process.env.ENCRYPTOR_SECRET_KEY || 'superSecretKey', // Create this env var to keep save the key for persistent encryptor
    onError: (error) => {
      // tslint:disable-next-line: no-console
      console.error('createEncryptor onError ==> ', error);
    },
  });

  const persistConfig: PersistConfig<any> = {
    key: 'root',
    storage,
    blacklist: ['game'], // comment this line to enable persistence even if user refresh the page.
    transforms: [encryptor as any],
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);
  //#endregion Persist Logic

  const store = createStore<IRootState, IAction, {}, {}>(persistedReducer, initialState, enhancer);
  const persistor = persistStore(store) as any;

  return { persistor, store };

};

export default configureStore;
