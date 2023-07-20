import {createReducer} from '@reduxjs/toolkit';
import * as SeriesActions from './seriesActions';
import {ISerie} from '@app/interfaces/SerieInterface';

type ISeriesState = {
  isLoading: boolean;
  hasError: boolean;
  list: ISerie[];
};

const initialState: ISeriesState = {
  isLoading: true,
  hasError: false,
  list: [],
};

export const seriesReducer = createReducer(initialState, builder => {
  builder.addCase(SeriesActions.getSeries.pending, state => ({
    ...state,
    isLoading: true,
    hasError: false,
    list: [],
  }));

  builder.addCase(SeriesActions.getSeries.fulfilled, (state, {payload}) => ({
    ...state,
    isLoading: false,
    list: payload,
  }));

  builder.addCase(SeriesActions.getSeries.rejected, state => ({
    ...state,
    isLoading: false,
    hasError: true,
  }));
});
