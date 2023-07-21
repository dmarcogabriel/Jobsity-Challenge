import {type RootState} from '@app/config/store';

export const selectBookmarks = (state: RootState) => state.bookmarks;
