import {useEffect} from 'react';
import {FlatList} from 'react-native';
import {useAppDispatch} from '@app/hooks/useAppDispatch';
import {useAppSelector} from '@app/hooks/useAppSelector';
import {getSeries, selectSeries} from '@app/store/series';
import styled from 'styled-components/native';
import SerieItem from './SerieItem';
import SearchSeriesInput from './SearchSeriesInput';
import {HomeStack} from '@app/constants/RouteNames';
import {IHomeStackParamsList} from '@app/interfaces/NavigationInterfaces';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

type INavigation = NativeStackNavigationProp<
  IHomeStackParamsList,
  HomeStack.Home
>;

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const {list} = useAppSelector(selectSeries);
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

  return (
    <Container>
      <SearchSeriesInput onSearch={handleSearch} />
      <SerieList
        data={list}
        keyExtractor={serie => String(serie.show.id)}
        renderItem={({item: serie}) => (
          <SerieItem serie={serie} onGoToDetails={handleGoToDetails} />
        )}
      />
    </Container>
  );
}

const Container = styled.View``;

const SerieList = styled.FlatList`` as unknown as typeof FlatList;
