import {IImage} from './ImageInterface';

export type IEpisode = {
  id: number;
  name: string;
  number: number;
  image: IImage;
  season: number;
  runtime: number;
  summary: string;
};
