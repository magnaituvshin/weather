import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { openWeatherApi } from '../services/openWeatherApi';

const store = configureStore({
  reducer: {
    [openWeatherApi.reducerPath]: openWeatherApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(openWeatherApi.middleware),
});

setupListeners(store.dispatch);

export default store;
