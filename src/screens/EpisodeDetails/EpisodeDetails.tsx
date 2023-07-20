import {useEffect} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import styled from 'styled-components/native';
import {Text} from 'react-native-paper';

import {IHomeStackParamsList} from '@app/interfaces/NavigationInterfaces';
import {HomeStack} from '@app/constants/RouteNames';
import {useAppDispatch} from '@app/hooks/useAppDispatch';
import {useAppSelector} from '@app/hooks/useAppSelector';
import {selectEpisodes, getEpisodeById} from '@app/store/epidodes';
import {Loading} from '@app/components/Loading';
import {htmlParse} from '@app/utils/htmlParser';

export default function EpisodeDetails() {
  const dispatch = useAppDispatch();
  const {episode, isLoading, hasError} = useAppSelector(selectEpisodes);

  const route =
    useRoute<RouteProp<IHomeStackParamsList, HomeStack.EpisodeDetails>>();

  useEffect(() => {
    const {id} = route.params;
    dispatch(getEpisodeById({id}));
  }, [dispatch, route.params]);

  return (
    <Container>
      {isLoading && <Loading />}
      {!isLoading && !!episode && (
        <>
          {episode.image && (
            <Image
              source={{uri: episode.image.original}}
              resizeMode="contain"
            />
          )}
          <Content>
            <Text>{`E${episode.number}S${episode.season}`}</Text>
            <Text>{episode.name}</Text>
            <Text>{`Summary: ${htmlParse(episode.summary)}`}</Text>
          </Content>
        </>
      )}
    </Container>
  );
}

const Container = styled.View``;

const Content = styled.View`
  padding: 16px;
`;

const Image = styled.Image`
  width: 100%;
  height: 210px;
  background: #333;
`;
