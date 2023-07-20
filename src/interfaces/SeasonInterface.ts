import {IImage} from './ImageInterface';

export type ISeason = {
  id: number;
  name?: string;
  season: number;
  number: number;
  image: IImage;
};
