import {List, ActivityIndicator} from 'react-native-paper';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import styled from 'styled-components/native';

import {ISeason} from '@app/interfaces/SeasonInterface';
import {HomeStack} from '@app/constants/RouteNames';
import {IHomeStackParamsList} from '@app/interfaces/NavigationInterfaces';
import {getEpisodesBySeasonId, selectShowDetails} from '@app/store/showDetails';
import {useAppDispatch} from '@app/hooks/useAppDispatch';
import {useAppSelector} from '@app/hooks/useAppSelector';

import EpisodeItem from './EpisodeItem';

type IProps = {
  season: ISeason;
  isExpanded: boolean;
  onExpand: () => void;
};
type INavigation = NativeStackNavigationProp<
  IHomeStackParamsList,
  HomeStack.SerieDetails
>;

export default function SeasonItem({season, isExpanded, onExpand}: IProps) {
  const navigation = useNavigation<INavigation>();
  const dispatch = useAppDispatch();
  const {isLoadingEpisodes} = useAppSelector(selectShowDetails);

  useEffect(() => {
    if (isExpanded && !season.episodes.length && !isLoadingEpisodes) {
      dispatch(getEpisodesBySeasonId({id: season.id, season: season.number}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isExpanded, season.episodes]);

  const handleExpandSession = () => {
    onExpand();
  };

  const handleGoToEpisode = (id: number) => {
    navigation.navigate(HomeStack.EpisodeDetails, {id});
  };

  return (
    <List.Accordion
      title={season.name || `Season #${season.number}`}
      expanded={isExpanded}
      onPress={handleExpandSession}>
      {isLoadingEpisodes && <Loading />}
      {season.episodes.map(episode => (
        <EpisodeItem
          key={episode.id}
          episode={episode}
          onGoToEpisode={handleGoToEpisode}
        />
      ))}
    </List.Accordion>
  );
}

const Loading = styled(ActivityIndicator)`
  margin: 16px 0;
`;
