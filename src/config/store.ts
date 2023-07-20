import {configureStore} from '@reduxjs/toolkit';

import series from '@app/store/series';
import showDetails from '@app/store/showDetails';
import episodes from '@app/store/epidodes';

const store = configureStore({
  reducer: {
    series,
    showDetails,
    episodes,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
