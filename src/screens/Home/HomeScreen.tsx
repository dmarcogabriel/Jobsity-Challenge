import {useEffect} from 'react';
import {FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {useAppDispatch} from '@app/hooks/useAppDispatch';
import {useAppSelector} from '@app/hooks/useAppSelector';
import {getSeries, selectSeries} from '@app/store/series';
import {HomeStack} from '@app/constants/RouteNames';
import {IHomeStackParamsList} from '@app/interfaces/NavigationInterfaces';
import {LoadingPage} from '@app/components/Loading';
import {Snackbar} from '@app/components/Snackbar';

import SerieItem from './SerieItem';
import SearchSeriesInput from './SearchSeriesInput';

type INavigation = NativeStackNavigationProp<
  IHomeStackParamsList,
  HomeStack.Home
>;

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const {list, isLoading, hasError} = useAppSelector(selectSeries);
  const navigation = useNavigation<INavigation>();

  useEffect(() => {
    dispatch(getSeries());
  }, [dispatch]);

  const handleSearch = (search: string) => {
    dispatch(getSeries({search}));
  };

  const handleGoToDetails = (id: number) => {
    navigation.navigate(HomeStack.SerieDetails, {id});
  };

  const handleError = () => {
    dispatch(getSeries());
  };

  return (
    <>
      <Container>
        <SearchWrapper>
          <SearchSeriesInput onSearch={handleSearch} isDisabled={isLoading} />
        </SearchWrapper>
        {isLoading && <LoadingPage />}
        <SerieList
          data={list}
          keyExtractor={serie => String(serie.show.id)}
          renderItem={({item: serie}) => (
            <SerieItem serie={serie} onGoToDetails={handleGoToDetails} />
          )}
        />
      </Container>
      <Snackbar visible={hasError} onDismiss={handleError}>
        Ops, Failed to load series.
      </Snackbar>
    </>
  );
}

const Container = styled.View`
  padding: 16px;
`;

const SearchWrapper = styled.View`
  margin-bottom: 16px;
`;

const SerieList = styled.FlatList`
  margin-bottom: 58px;
` as unknown as typeof FlatList;
