import styled from 'styled-components/native';
import {Text} from 'react-native-paper';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

import {ISeason} from '@app/interfaces/SeasonInterface';
import {IEpisode} from '@app/interfaces/EpisodeInterface';
import {HomeStack} from '@app/constants/RouteNames';
import {IHomeStackParamsList} from '@app/interfaces/NavigationInterfaces';

import EpisodeItem from './EpisodeItem';

type IProps = {
  season: ISeason;
  episodes: IEpisode[];
};
type INavigation = NativeStackNavigationProp<
  IHomeStackParamsList,
  HomeStack.SerieDetails
>;

export default function SeasonItem({season, episodes}: IProps) {
  const navigation = useNavigation<INavigation>();

  const handleGoToEpisode = (id: number) => {
    navigation.navigate(HomeStack.EpisodeDetails, {id});
  };

  return (
    <>
      <Header>
        <Text>{season.name || `Season #${season.number}`}</Text>
      </Header>

      {episodes.map(episode => (
        <EpisodeItem
          key={episode.id}
          episode={episode}
          onGoToEpisode={handleGoToEpisode}
        />
      ))}
    </>
  );
}

const Header = styled.View`
  margin: 8px 0;
  padding: 16px 16px;
  background: white;
`;
