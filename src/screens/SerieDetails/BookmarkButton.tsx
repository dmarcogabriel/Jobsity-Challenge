import {IconButton, MD3Colors} from 'react-native-paper';
import styled from 'styled-components/native';
import {useEffect, useMemo} from 'react';

import {useAppDispatch} from '@app/hooks/useAppDispatch';
import {useAppSelector} from '@app/hooks/useAppSelector';
import {
  bookmarkSerie,
  selectBookmarks,
  getBookmarks,
  removeBookmark,
} from '@app/store/bookmarks';
import {ISerie} from '@app/interfaces/SerieInterface';

type IProps = {
  serie: ISerie;
};

export default function BookmarkButton({serie}: IProps) {
  const dispatch = useAppDispatch();
  const {list} = useAppSelector(selectBookmarks);

  useEffect(() => {
    if (!list.length) {
      dispatch(getBookmarks());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const isBookmarked = useMemo(() => {
    return list.some(item => item.show.id === serie.show.id);
  }, [list, serie]);

  const bookmarkIconColor = useMemo(() => {
    return isBookmarked ? MD3Colors.primary50 : MD3Colors.neutral100;
  }, [isBookmarked]);

  const handleBookmark = async () => {
    if (isBookmarked) {
      await dispatch(removeBookmark(serie.show.id)).unwrap();
    } else {
      await dispatch(bookmarkSerie(serie)).unwrap();
    }
    // dispatch(getBookmarks());
  };

  return (
    <BookmarkButtonContainer
      icon="bookmark"
      iconColor={bookmarkIconColor}
      onPress={handleBookmark}
    />
  );
}

const BookmarkButtonContainer = styled(IconButton)`
  position: absolute;
  top: 4px;
  right: 4px;
`;
