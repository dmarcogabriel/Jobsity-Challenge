import api from '@app/config/api';
import {IShow} from '@app/interfaces/ShowInterface';
import {ISeason} from '@app/interfaces/SeasonInterface';
import {IEpisode} from '@app/interfaces/EpisodeInterface';

type IGetShowDetailsByIdPayload = {
  id: number;
};
type IGetSeasonsShowByIdPayload = {
  id: number;
};
type IGetSeasonsShowByIdResponse = Omit<ISeason, 'episodes'>[];
type IGetEpisodesBySeasonIdPayload = {
  id: number;
  season: number;
};

export const getShowDetailsById = async (
  payload: IGetShowDetailsByIdPayload,
) => {
  try {
    const {data} = await api.get<IShow>(`shows/${payload.id}`);

    return data;
  } catch (e) {
    throw new Error('');
  }
};

export const getSeasonsShowById = async (
  payload: IGetSeasonsShowByIdPayload,
) => {
  try {
    const {data} = await api.get<IGetSeasonsShowByIdResponse>(
      `shows/${payload.id}/seasons`,
    );

    return data;
  } catch (e) {
    throw new Error('');
  }
};

export const getEpisodesByShowId = async (
  payload: IGetEpisodesBySeasonIdPayload,
) => {
  try {
    const {data} = await api.get<IEpisode[]>(`seasons/${payload.id}/episodes`);

    return {episodes: data, season: payload.season};
  } catch (e) {
    throw new Error('');
  }
};
