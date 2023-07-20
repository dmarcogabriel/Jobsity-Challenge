import {IImage} from './ImageInterface';

type IShowSchedule = {
  time: string;
  days: string[];
};

export type IShow = {
  id: number;
  url: string;
  name: string;
  image?: IImage;
  genres: string[];
  schedule: IShowSchedule;
  summary: string;
};
