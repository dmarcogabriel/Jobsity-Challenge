import {List} from 'react-native-paper';
import {IEpisode} from '@app/interfaces/EpisodeInterface';

type IProps = {
  episode: IEpisode;
  onGoToEpisode: (id: number) => void;
};

export default function EpisodeItem({episode, onGoToEpisode}: IProps) {
  const handleGoToEpisode = () => onGoToEpisode(episode.id);

  return (
    <List.Item
      onPress={handleGoToEpisode}
      title={`${episode.number || 'Special'} - ${episode.name}`}
      description={episode.runtime ? `${episode.runtime}m` : ''}
    />
  );
}
