import {useEffect, useMemo} from 'react';
import styled from 'styled-components/native';
import {FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {useAppDispatch} from '@app/hooks/useAppDispatch';
import {useAppSelector} from '@app/hooks/useAppSelector';
import {selectBookmarks, getBookmarks} from '@app/store/bookmarks';
import {LoadingPage} from '@app/components/Loading';
import {Snackbar} from '@app/components/Snackbar';
import SerieItem from '@app/components/SerieItem';
import {ISerie} from '@app/interfaces/SerieInterface';
import {IHomeStackParamsList} from '@app/interfaces/NavigationInterfaces';
import {HomeStack} from '@app/constants/RouteNames';

type INavigation = NativeStackNavigationProp<
  IHomeStackParamsList,
  HomeStack.Bookmark
>;

export default function BookmarkScreen() {
  const dispatch = useAppDispatch();
  const {list, isLoading, hasError} = useAppSelector(selectBookmarks);
  const navigation = useNavigation<INavigation>();

  useEffect(() => {
    dispatch(getBookmarks());
  }, [dispatch]);

  const handleGoToShow = (serie: ISerie) => {
    navigation.navigate(HomeStack.SerieDetails, {serie});
  };

  const handleError = () => {
    dispatch(getBookmarks());
  };

  const sortedList = useMemo(() => {
    return [...list].sort((a, b) => {
      if (a.show.name.toLowerCase() < b.show.name.toLowerCase()) {
        return -1;
      }
      if (a.show.name.toLowerCase() > b.show.name.toLowerCase()) {
        return 1;
      }
      return 0;
    });
  }, [list]);

  return (
    <>
      <Container>
        {isLoading && <LoadingPage />}
        <SerieList
          data={sortedList}
          keyExtractor={serie => String(serie.show.id)}
          renderItem={({item: serie}) => (
            <SerieItem serie={serie} onGoToDetails={handleGoToShow} />
          )}
        />
      </Container>
      <Snackbar visible={hasError} onDismiss={handleError}>
        Ops, Failed to load Bookmarks.
      </Snackbar>
    </>
  );
}

const Container = styled.View``;

const SerieList = styled.FlatList`
  margin-bottom: 58px;
` as unknown as typeof FlatList;
