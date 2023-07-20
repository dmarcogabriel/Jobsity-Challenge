import {createAsyncThunk} from '@reduxjs/toolkit';

import * as ShowDetailsService from './showDetailsService';

export const getShowDetailsById = createAsyncThunk(
  'show/getSerieDetailsById',
  ShowDetailsService.getShowDetailsById,
);

export const getSeasonsByShowId = createAsyncThunk(
  'show/getSeasonsBySerieId',
  ShowDetailsService.getSeasonsShowById,
);

export const getEpisodesBySeasonId = createAsyncThunk(
  'show/getEpisodesBySeasonId',
  ShowDetailsService.getEpisodesByShowId,
);
