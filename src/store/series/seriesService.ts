import api from '@app/config/api';
import {ISerie} from '@app/interfaces/SerieInterface';

type IGetSeriesPayload = {
  search?: string;
};

export const getSeries = async (payload: IGetSeriesPayload = {}) => {
  try {
    const query = payload?.search ?? 'a';
    const {data} = await api.get<ISerie[]>('search/shows', {
      params: {q: query},
    });

    return data;
  } catch (e) {
    throw new Error('');
  }
};
