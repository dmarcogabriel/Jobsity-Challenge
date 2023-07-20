import styled from 'styled-components/native';
import {Text} from 'react-native-paper';
import {ISeason} from '@app/interfaces/SeasonInterface';
import {IEpisode} from '@app/interfaces/EpisodeInterface';
import EpisodeItem from './EpisodeItem';

type IProps = {
  season: ISeason;
  episodes: IEpisode[];
};

export default function SeasonItem({season, episodes}: IProps) {
  const handleGoToEpisode = (id: number) => {
    // todo: navigate to episode details
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
