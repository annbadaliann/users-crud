import {Action, combineReducers, configureStore} from '@reduxjs/toolkit';
import appReducer from './slicers/app';
import authReducer from './slicers/auth';
import mentorReducer from './slicers/users';
import errorHandling from './middlewares/errorHandle';

const combinedReducers = combineReducers({
  app: appReducer,
  users: mentorReducer,
  auth: authReducer,
});

const rootReducer = (state: any | undefined, action: Action) =>
  combinedReducers(state, action);

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(errorHandling),
});

export type AppDispatch = typeof store.dispatch;

export default store;

