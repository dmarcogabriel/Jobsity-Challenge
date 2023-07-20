import {HomeStack} from '@app/constants/RouteNames';

export type IHomeStackParamsList = {
  [HomeStack.Home]: undefined;
  [HomeStack.SerieDetails]: {id: number};
};
