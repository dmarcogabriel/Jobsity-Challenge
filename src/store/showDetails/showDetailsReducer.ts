import {createReducer} from '@reduxjs/toolkit';
import * as SerieDetailsActions from './showDetailsActions';
import {IShow} from '@app/interfaces/ShowInterface';
import {ISeason} from '@app/interfaces/SeasonInterface';
import {IEpisode} from '@app/interfaces/EpisodeInterface';

type IShowDetailsState = {
  isLoading: boolean;
  hasError: boolean;
  isLoadingSeason: boolean;
  isLoadingEpisodes: boolean;
  show?: IShow;
  seasons?: ISeason[];
  episodes?: IEpisode[];
};

const initialState: IShowDetailsState = {
  isLoading: true,
  isLoadingSeason: true,
  isLoadingEpisodes: true,
  hasError: false,
};

export const showDetailsReducer = createReducer(initialState, builder => {
  builder.addCase(SerieDetailsActions.getShowDetailsById.pending, state => ({
    ...state,
    isLoading: true,
    hasError: false,
    show: undefined,
  }));

  builder.addCase(
    SerieDetailsActions.getShowDetailsById.fulfilled,
    (state, {payload}) => ({
      ...state,
      isLoading: false,
      show: payload,
    }),
  );

  builder.addCase(SerieDetailsActions.getShowDetailsById.rejected, state => ({
    ...state,
    isLoading: false,
    hasError: true,
  }));

  builder.addCase(SerieDetailsActions.getSeasonsByShowId.pending, state => ({
    ...state,
    isLoadingSeason: true,
    hasError: false,
    seasons: [],
  }));

  builder.addCase(
    SerieDetailsActions.getSeasonsByShowId.fulfilled,
    (state, {payload}) => ({
      ...state,
      isLoadingSeason: false,
      seasons: payload,
    }),
  );

  builder.addCase(SerieDetailsActions.getSeasonsByShowId.rejected, state => ({
    ...state,
    isLoadingSeason: false,
    hasError: true,
  }));

  builder.addCase(SerieDetailsActions.getEpisodesBySeasonId.pending, state => ({
    ...state,
    isLoadingEpisodes: true,
    hasError: false,
    episodes: [],
  }));

  builder.addCase(
    SerieDetailsActions.getEpisodesBySeasonId.fulfilled,
    (state, {payload}) => ({
      ...state,
      isLoadingEpisodes: false,
      episodes: payload,
    }),
  );

  builder.addCase(
    SerieDetailsActions.getEpisodesBySeasonId.rejected,
    state => ({
      ...state,
      isLoadingEpisodes: false,
      hasError: true,
    }),
  );
});
