import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from 'redux-persist'
import reducers from './reducers';
import sagas from "./sagas";
import storage from 'redux-persist/lib/storage';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const persistConfig = {
  key: 'root',
  // whitelist: ['Saleslog'],
  storage,
}

export function configureStore(initialState) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  let store = createStore(
    persistReducer(persistConfig, reducers),
    initialState,
    composeEnhancers(
      applyMiddleware(...middlewares)
    ),
  );
  sagaMiddleware.run(sagas);
  var persistor = persistStore(store);
  return { store, persistor };
}
