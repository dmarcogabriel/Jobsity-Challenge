import {createAsyncThunk} from '@reduxjs/toolkit';
import * as BookmarkService from './bookmarkService';

export const bookmarkSerie = createAsyncThunk(
  'bookmarks/bookmarkSerie',
  BookmarkService.bookmarkSerie,
);

export const getBookmarks = createAsyncThunk(
  'bookmarks/getBookmarks',
  BookmarkService.getBookmarks,
);

export const removeBookmark = createAsyncThunk(
  'bookmarks/removeBookmark',
  BookmarkService.removeBookmark,
);
