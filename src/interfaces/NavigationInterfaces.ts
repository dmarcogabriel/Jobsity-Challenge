import {HomeStack} from '@app/constants/RouteNames';

import {ISerie} from './SerieInterface';

export type IHomeStackParamsList = {
  [HomeStack.Home]: undefined;
  [HomeStack.SerieDetails]: {serie: ISerie};
  [HomeStack.EpisodeDetails]: {id: number};
  [HomeStack.Bookmark]: undefined;
};
