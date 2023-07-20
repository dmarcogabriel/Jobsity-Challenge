import {createAsyncThunk} from '@reduxjs/toolkit';

import * as SeriesService from './seriesService';

export const getSeries = createAsyncThunk(
  'series/getSeries',
  SeriesService.getSeries,
);

export const getSerieDetailsById = createAsyncThunk(
  'series/getSerieDetailsById',
  SeriesService.getSerieDetailsById,
);
