import {configureStore} from '@reduxjs/toolkit';

import series from '@app/store/series';

const store = configureStore({
  reducer: {
    series,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
