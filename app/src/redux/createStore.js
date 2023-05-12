import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import reducer from './reducers';

const middleware = [...getDefaultMiddleware({ thunk: false })];

function createStore(preloadedState) {
  const store = configureStore({
    reducer,
    middleware,
    preloadedState,
  });

  return store;
}

export default createStore;
