import api from '@app/config/api';

export const getSeries = async () => {
  try {
    const {data} = await api.get('');
  } catch (e) {
    throw new Error('');
  }
};
