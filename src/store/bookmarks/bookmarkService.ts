import AsyncStorage from '@react-native-async-storage/async-storage';

import {BOOKMARK_STORAGE_KEY} from '@app/constants/StorageKeys';
import {ISerie} from '@app/interfaces/SerieInterface';

export const bookmarkSerie = async (serie: ISerie) => {
  try {
    const bookmarks = await getBookmarks();

    const updatedBookmarks = [...bookmarks, serie];

    await AsyncStorage.setItem(
      BOOKMARK_STORAGE_KEY,
      JSON.stringify(updatedBookmarks),
    );

    return updatedBookmarks;
  } catch (e: any) {
    return [];
  }
};

export const getBookmarks = async () => {
  try {
    const jsonBookmarks = await AsyncStorage.getItem(BOOKMARK_STORAGE_KEY);
    return jsonBookmarks ? (JSON.parse(jsonBookmarks) as ISerie[]) : [];
  } catch (e: any) {
    return [];
  }
};

export const removeBookmark = async (showId: number) => {
  try {
    const bookmarks = await getBookmarks();

    const updatedBookmarks = bookmarks.filter(
      serie => serie.show.id !== showId,
    );

    await AsyncStorage.setItem(
      BOOKMARK_STORAGE_KEY,
      JSON.stringify(updatedBookmarks),
    );

    return updatedBookmarks;
  } catch (e: any) {
    return [];
  }
};
