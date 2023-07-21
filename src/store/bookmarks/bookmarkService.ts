import AsyncStorage from '@react-native-async-storage/async-storage';

import {BOOKMARK_STORAGE_KEY} from '@app/constants/StorageKeys';

export const bookmarkSerie = async (serieId: number) => {
  try {
    const bookmarks = await getBookmarks();

    const updatedBookmarks = [...bookmarks, serieId];

    await AsyncStorage.setItem(
      BOOKMARK_STORAGE_KEY,
      JSON.stringify(updatedBookmarks),
    );

    return true;
  } catch (e: any) {
    return false;
  }
};

export const getBookmarks = async () => {
  try {
    const jsonBookmarks = await AsyncStorage.getItem(BOOKMARK_STORAGE_KEY);
    return jsonBookmarks ? (JSON.parse(jsonBookmarks) as number[]) : [];
  } catch (e: any) {
    return [];
  }
};
