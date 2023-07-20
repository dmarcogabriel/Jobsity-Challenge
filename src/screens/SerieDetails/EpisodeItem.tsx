import styled from 'styled-components/native';
import {Text} from 'react-native-paper';
import {TouchableOpacity} from 'react-native';
import {IEpisode} from '@app/interfaces/EpisodeInterface';

type IProps = {
  episode: IEpisode;
  onGoToEpisode: (id: number) => void;
};

export default function EpisodeItem({episode, onGoToEpisode}: IProps) {
  const handleGoToEpisode = () => onGoToEpisode(episode.id);

  return (
    <TouchableOpacity onPress={handleGoToEpisode}>
      <EpisodeWrapper>
        <Text>{episode.name}</Text>
        {episode.runtime && <Text>{`${episode.runtime}m`}</Text>}
      </EpisodeWrapper>
    </TouchableOpacity>
  );
}

const EpisodeWrapper = styled.View`
  padding: 16px 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
