import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authSlice from '../slice/authSlice';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import userAuthSlice from '../slice/userauthSlice';
import { watchUserSaga } from '../saga/authSaga';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  userauth: userAuthSlice,
  authslice: authSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

function* rootSaga() {
  yield all([watchUserSaga()]);
}

sagaMiddleware.run(rootSaga);

export default store;
