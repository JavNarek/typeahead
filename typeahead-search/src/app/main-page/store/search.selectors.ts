import { createSelector } from '@ngrx/store';
import { selectCache } from './search.reducer';

export const selectCahedKeys = createSelector(selectCache, (cache) => {
  return new Map(Object.entries(cache));
});
