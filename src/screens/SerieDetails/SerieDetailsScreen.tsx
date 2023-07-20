import {useEffect} from 'react';
import styled from 'styled-components/native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useAppDispatch} from '@app/hooks/useAppDispatch';
import {useAppSelector} from '@app/hooks/useAppSelector';
import {
  getShowDetailsById,
  getSeasonsByShowId,
  getEpisodesBySeasonId,
  selectShowDetails,
} from '@app/store/showDetails';
import {IHomeStackParamsList} from '@app/interfaces/NavigationInterfaces';
import {HomeStack} from '@app/constants/RouteNames';
import {Text} from 'react-native-paper';
import SeasonItem from './SeasonItem';

export default function SerieDetails() {
  const dispatch = useAppDispatch();
  const {show, isLoading, hasError, isLoadingSeason, seasons, episodes} =
    useAppSelector(selectShowDetails);
  const route =
    useRoute<RouteProp<IHomeStackParamsList, HomeStack.SerieDetails>>();

  useEffect(() => {
    const {id} = route.params;
    dispatch(getShowDetailsById({id}));
    dispatch(getSeasonsByShowId({id}));
    dispatch(getEpisodesBySeasonId({id}));
  }, [dispatch, route.params]);

  console.log(show);

  return (
    <Container>
      {isLoading && <Loading />}
      {!isLoading && !!show && (
        <Content>
          {!!show?.image && (
            <>
              <Poster
                source={{uri: show?.image?.original}}
                resizeMode="contain"
              />
              <Text>{show.name}</Text>
              {!!show.schedule.days.length && (
                <Text>{`${show.schedule.days.join(', ')} at ${
                  show.schedule.time
                }`}</Text>
              )}
              {show.summary && <Text>{`Summary: ${show.summary}`}</Text>}
            </>
          )}
          {seasons?.map(season => (
            <SeasonItem
              key={String(season.id)}
              season={season}
              episodes={episodes?.filter(ep => ep.season !== season.id) ?? []}
            />
          ))}
        </Content>
      )}
    </Container>
  );
}

const Container = styled.View``;

const Loading = styled.ActivityIndicator``;

const Content = styled.ScrollView``;

const Poster = styled.Image`
  width: 100%;
  height: 220px;
  background: #333333;
`;
