import {useEffect} from 'react';
import {FlatList} from 'react-native';
import {useAppDispatch} from '@app/hooks/useAppDispatch';
import {useAppSelector} from '@app/hooks/useAppSelector';
import {getSeries, selectSeries} from '@app/store/series';
import styled from 'styled-components/native';
import SerieItem from './SerieItem';
import SearchSeriesInput from './SearchSeriesInput';

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const {list} = useAppSelector(selectSeries);

  useEffect(() => {
    dispatch(getSeries());
  }, [dispatch]);

  const handleSearch = (search: string) => {
    dispatch(getSeries({search}));
  };

  const handleGoToDetails = (id: number) => {
    // TODO: navigate to details
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
