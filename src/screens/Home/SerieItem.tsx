import {ISerie} from '@app/interfaces/SerieInterface';
import {Card, Text} from 'react-native-paper';
import styled from 'styled-components/native';

type IProps = {
  serie: ISerie;
  onGoToDetails: (id: number) => void;
};

export default function SerieItem({serie, onGoToDetails}: IProps) {
  const handleGoToDetails = () => onGoToDetails(serie.show.id);

  return (
    <Card onPress={handleGoToDetails}>
      {!!serie.show.image && (
        <Poster source={{uri: serie.show.image.medium}} resizeMode="contain" />
      )}
      <Text>{serie.show.name}</Text>
    </Card>
  );
}

const Poster = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 4px;
`;
