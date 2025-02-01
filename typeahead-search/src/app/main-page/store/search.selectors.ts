import { createSelector } from '@ngrx/store';
import { selectCache } from './search.reducer';

export const selectCached = createSelector(selectCache, (cache) => {
  return new Map(Object.entries(cache));
});
