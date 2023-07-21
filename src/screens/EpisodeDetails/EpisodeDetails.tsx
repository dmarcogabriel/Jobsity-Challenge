import {useEffect} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import styled from 'styled-components/native';
import {Text} from 'react-native-paper';

import {IHomeStackParamsList} from '@app/interfaces/NavigationInterfaces';
import {HomeStack} from '@app/constants/RouteNames';
import {useAppDispatch} from '@app/hooks/useAppDispatch';
import {useAppSelector} from '@app/hooks/useAppSelector';
import {selectEpisodes, getEpisodeById} from '@app/store/epidodes';
import {LoadingPage} from '@app/components/Loading';
import {htmlParse} from '@app/utils/htmlParser';
import PosterPlaceholderImg from '@app/assets/image-placeholder.png';
import {Snackbar} from '@app/components/Snackbar';

export default function EpisodeDetails() {
  const dispatch = useAppDispatch();
  const {episode, isLoading, hasError} = useAppSelector(selectEpisodes);

  const route =
    useRoute<RouteProp<IHomeStackParamsList, HomeStack.EpisodeDetails>>();

  useEffect(() => {
    const {id} = route.params;
    dispatch(getEpisodeById({id}));
  }, [dispatch, route.params]);

  const handleError = () => {
    const {id} = route.params;
    dispatch(getEpisodeById({id}));
  };

  return (
    <>
      <Container>
        {isLoading && <LoadingPage />}
        {!isLoading && !!episode && (
          <>
            <Image
              source={
                episode.image
                  ? {uri: episode.image.original}
                  : PosterPlaceholderImg
              }
              resizeMode="contain"
            />
            <Content>
              <Text variant="displayMedium">{episode.name}</Text>
              <EpisodeNumber variant="bodySmall">{`E${episode.number}S${episode.season}`}</EpisodeNumber>
              <Text variant="bodyLarge">{`Summary: ${htmlParse(
                episode.summary,
              )}`}</Text>
            </Content>
          </>
        )}
      </Container>
      <Snackbar visible={hasError} onDismiss={handleError}>
        Ops, Failed to load Episode details.
      </Snackbar>
    </>
  );
}

const Container = styled.ScrollView``;

const Content = styled.View`
  padding: 16px;
`;

const Image = styled.Image`
  width: 100%;
  height: 210px;
  background: #333;
`;

const EpisodeNumber = styled(Text)`
  margin: 8px 0;
`;
