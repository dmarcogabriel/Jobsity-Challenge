import {useEffect, useCallback, useState} from 'react';
import styled from 'styled-components/native';
import {Text, List, Chip} from 'react-native-paper';
import {RouteProp, useRoute} from '@react-navigation/native';
import {ScrollView} from 'react-native';

import {useAppDispatch} from '@app/hooks/useAppDispatch';
import {useAppSelector} from '@app/hooks/useAppSelector';
import {
  getShowDetailsById,
  getSeasonsByShowId,
  selectShowDetails,
} from '@app/store/showDetails';
import {IHomeStackParamsList} from '@app/interfaces/NavigationInterfaces';
import {HomeStack} from '@app/constants/RouteNames';
import {LoadingPage} from '@app/components/Loading';
import {htmlParse} from '@app/utils/htmlParser';
import PosterPlaceholderImg from '@app/assets/image-placeholder.png';

import SeasonItem from './SeasonItem';

export default function SerieDetails() {
  const dispatch = useAppDispatch();
  const [expandedSeasonIndex, setExpandedSeasonIndex] = useState(0);
  // todo: add error and loading
  const {show, isLoading, hasError, isLoadingSeason, seasons} =
    useAppSelector(selectShowDetails);
  const route =
    useRoute<RouteProp<IHomeStackParamsList, HomeStack.SerieDetails>>();

  const loadData = useCallback(
    async (id: number) => {
      await dispatch(getShowDetailsById({id})).unwrap();
      await dispatch(getSeasonsByShowId({id}));
    },
    [dispatch],
  );

  useEffect(() => {
    const {id} = route.params;
    loadData(id);
  }, [route.params, loadData]);

  return (
    <Container>
      {isLoading && <LoadingPage />}
      {!isLoading && !!show && (
        <ScrollView>
          <Poster
            source={
              show?.image ? {uri: show?.image?.original} : PosterPlaceholderImg
            }
            resizeMode="contain"
          />
          <Content>
            <Text variant="displayLarge">{show.name}</Text>
            {!!show.schedule.days.length && (
              <Text variant="bodyLarge">{`${show.schedule.days.join(', ')} at ${
                show.schedule.time
              }`}</Text>
            )}
            <GenresWrapper>
              {show.genres.map(genre => (
                <Genre key={genre}>{genre}</Genre>
              ))}
            </GenresWrapper>
            {show.summary && (
              <Text>{`Summary: ${htmlParse(show.summary)}`}</Text>
            )}
          </Content>
          <List.Section title="Seasons">
            {seasons?.map((season, index) => (
              <SeasonItem
                key={String(season.id)}
                season={season}
                isExpanded={index === expandedSeasonIndex}
                onExpand={() => setExpandedSeasonIndex(index)}
              />
            ))}
          </List.Section>
        </ScrollView>
      )}
    </Container>
  );
}

const Container = styled.View``;

const Content = styled.View`
  padding: 16px;
`;

const Poster = styled.Image`
  width: 100%;
  height: 220px;
  background: #333;
`;

const GenresWrapper = styled.View`
  flex-direction: row;
  margin: 8px 0;
`;

const Genre = styled(Chip)`
  border-radius: 100px;
  margin: 0 4px;
`;
