import {createReducer} from '@reduxjs/toolkit';
import * as SeriesActions from './seriesActions';

type ISeriesState = {};

const initialState: ISeriesState = {};

export const seriesReducer = createReducer(initialState, builder => {
  builder.addCase(SeriesActions.getSeries.pending, state => ({...state}));

  builder.addCase(SeriesActions.getSeries.fulfilled, state => ({...state}));

  builder.addCase(SeriesActions.getSeries.rejected, (state, {error}) => ({
    ...state,
  }));
});
