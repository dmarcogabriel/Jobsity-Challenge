import api from '@app/config/api';
import {IEpisode} from '@app/interfaces/EpisodeInterface';

type IGetEpisodeByIdPayload = {
  id: number;
};

export const getEpisodeById = async (payload: IGetEpisodeByIdPayload) => {
  try {
    const {data} = await api.get<IEpisode>(`episodes/${payload.id}`);

    return data;
  } catch (e) {
    throw new Error('');
  }
};
