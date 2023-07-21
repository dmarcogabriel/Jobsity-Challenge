import {createReducer} from '@reduxjs/toolkit';
import * as BookmarkActions from './bookmarkActions';

type IBookmarkState = {
  isLoading: boolean;
  list: number[];
  hasError: boolean;
};

const initialValues: IBookmarkState = {
  isLoading: false,
  list: [],
  hasError: false,
};

export const bookmarkReducer = createReducer(initialValues, builder => {
  builder.addCase(BookmarkActions.getBookmarks.pending, state => ({
    ...state,
    isLoading: true,
    hasError: false,
    list: [],
  }));

  builder.addCase(
    BookmarkActions.getBookmarks.fulfilled,
    (state, {payload}) => ({
      ...state,
      isLoading: false,
      list: payload,
    }),
  );

  builder.addCase(BookmarkActions.getBookmarks.rejected, state => ({
    ...state,
    isLoading: false,
    hasError: true,
  }));

  builder.addCase(BookmarkActions.bookmarkSerie.pending, state => ({
    ...state,
    hasError: false,
  }));

  builder.addCase(BookmarkActions.bookmarkSerie.fulfilled, state => ({
    ...state,
  }));

  builder.addCase(BookmarkActions.bookmarkSerie.rejected, state => ({
    ...state,
    hasError: true,
  }));
});
