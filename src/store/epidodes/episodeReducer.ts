import {createReducer} from '@reduxjs/toolkit';
import * as EpisodeActions from './episodeActions';
import {IEpisode} from '@app/interfaces/EpisodeInterface';

type IEpisodeState = {
  isLoading: boolean;
  hasError: boolean;
  episode?: IEpisode;
};

const initialState: IEpisodeState = {
  isLoading: true,
  hasError: false,
};

export const episodesReducer = createReducer(initialState, builder => {
  builder.addCase(EpisodeActions.getEpisodeById.pending, state => ({
    ...state,
    isLoading: true,
    hasError: false,
    episode: undefined,
  }));

  builder.addCase(
    EpisodeActions.getEpisodeById.fulfilled,
    (state, {payload}) => ({
      ...state,
      isLoading: false,
      episode: payload,
    }),
  );

  builder.addCase(EpisodeActions.getEpisodeById.rejected, state => ({
    ...state,
    isLoading: false,
    hasError: true,
  }));
});
