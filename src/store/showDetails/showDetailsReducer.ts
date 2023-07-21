import {createReducer} from '@reduxjs/toolkit';
import * as SerieDetailsActions from './showDetailsActions';
import {IShow} from '@app/interfaces/ShowInterface';
import {ISeason} from '@app/interfaces/SeasonInterface';

type IShowDetailsState = {
  isLoading: boolean;
  hasError: boolean;
  isLoadingSeason: boolean;
  isLoadingEpisodes: boolean;
  show?: IShow;
  seasons?: ISeason[];
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
      seasons: payload.map(season => ({...season, episodes: []})),
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
  }));

  builder.addCase(
    SerieDetailsActions.getEpisodesBySeasonId.fulfilled,
    (state, {payload}) => {
      const seasons = state.seasons?.map(season => ({
        ...season,
        episodes:
          payload.season === season.number ? payload.episodes : season.episodes,
      }));

      return {
        ...state,
        isLoadingEpisodes: false,
        seasons,
      };
    },
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
