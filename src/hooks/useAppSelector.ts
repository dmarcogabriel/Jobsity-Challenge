import {useSelector, type TypedUseSelectorHook} from 'react-redux';

import type {RootState} from '@app/config/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
