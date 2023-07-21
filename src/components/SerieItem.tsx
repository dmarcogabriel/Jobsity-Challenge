import {Card, Text} from 'react-native-paper';
import styled from 'styled-components/native';

import {ISerie} from '@app/interfaces/SerieInterface';
import PosterPlaceholderImg from '@app/assets/image-placeholder.png';

type IProps = {
  serie: ISerie;
  onGoToDetails: (serie: ISerie) => void;
};

export default function SerieItem({serie, onGoToDetails}: IProps) {
  const handleGoToDetails = () => onGoToDetails(serie);

  return (
    <Container onPress={handleGoToDetails}>
      <CardContent>
        <Poster
          source={
            serie.show?.image
              ? {uri: serie.show?.image?.medium}
              : PosterPlaceholderImg
          }
          resizeMode="contain"
        />
        <Text variant="titleMedium">{serie.show.name}</Text>
      </CardContent>
    </Container>
  );
}

const Container = styled(Card)`
  margin: 8px 8px;
  background: #fff;
`;

const CardContent = styled(Card.Content)`
  flex-direction: row;
`;

const Poster = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 4px;
  margin-right: 8px;
`;
