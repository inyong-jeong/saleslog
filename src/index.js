import 'react-app-polyfill/ie11';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux';
import { configureStore } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'

const store = configureStore();
const st = '';

ReactDOM.render(<Provider store={store.store}>
  <PersistGate loading={null} persistor={store.persistor} >
    <App historyStore={store.store} />
  </PersistGate>
</Provider>, document.getElementById('root'));
