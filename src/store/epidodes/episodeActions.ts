import {createAsyncThunk} from '@reduxjs/toolkit';

import * as EpisodeService from './episodeService';

export const getEpisodeById = createAsyncThunk(
  'episode/getEpisodeById',
  EpisodeService.getEpisodeById,
);
