import {useEffect, useCallback, useState} from 'react';
import styled from 'styled-components/native';
import {Text, List, Chip, ActivityIndicator} from 'react-native-paper';
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
import {Snackbar} from '@app/components/Snackbar';
import {htmlParse} from '@app/utils/htmlParser';
import PosterPlaceholderImg from '@app/assets/image-placeholder.png';

import SeasonItem from './SeasonItem';
import BookmarkButton from './BookmarkButton';

export default function SerieDetails() {
  const dispatch = useAppDispatch();
  const [expandedSeasonIndex, setExpandedSeasonIndex] = useState(0);
  const {show, isLoading, hasError, isLoadingSeason, seasons} =
    useAppSelector(selectShowDetails);
  const route =
    useRoute<RouteProp<IHomeStackParamsList, HomeStack.SerieDetails>>();

  const {serie} = route.params;

  const loadData = useCallback(
    async (id: number) => {
      await dispatch(getShowDetailsById({id})).unwrap();
      await dispatch(getSeasonsByShowId({id}));
    },
    [dispatch],
  );

  useEffect(() => {
    loadData(serie.show.id);
  }, [serie, loadData]);

  const handleError = () => {
    loadData(serie.show.id);
  };

  return (
    <>
      <Container>
        {isLoading && <LoadingPage />}
        {!isLoading && !!show && (
          <ScrollView>
            <Poster
              source={
                show?.image
                  ? {uri: show?.image?.original}
                  : PosterPlaceholderImg
              }
              resizeMode="contain">
              <BookmarkButton serie={serie} />
            </Poster>
            <Content>
              <Text variant="displayLarge">{show.name}</Text>
              {!!show.schedule.days.length && (
                <Text variant="bodyLarge">{`${show.schedule.days.join(
                  ', ',
                )} at ${show.schedule.time}`}</Text>
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
              {isLoadingSeason && <LoadingSeasons />}
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
      <Snackbar visible={hasError} onDismiss={handleError}>
        Ops, Failed to load seasons.
      </Snackbar>
    </>
  );
}

const Container = styled.View``;

const Content = styled.View`
  padding: 16px;
`;

const Poster = styled.ImageBackground`
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

const LoadingSeasons = styled(ActivityIndicator)`
  margin: 16px 0;
`;
