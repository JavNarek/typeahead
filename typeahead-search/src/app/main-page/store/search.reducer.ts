import { createFeature, createReducer, on } from '@ngrx/store';
import { addPastQuery, searchSuccess, usePastQuery } from './search.actions';
import { User } from '../../types/user.interface';

interface SerchState {
  cache: { [query: string]: User[] };
  result: User[];
  pastQueries: string[];
  query: string;
}

const initialState: SerchState = {
  cache: {},
  result: [],
  pastQueries: [],
  query: '',
};

export const searchReducer = createReducer(
  initialState,
  on(searchSuccess, (state, { query, results }) => ({
    ...state,
    cache: { ...state.cache, [query]: results },
    result: results,
    query,
  })),
  on(addPastQuery, (state, { query }) => ({
    ...state,
    pastQueries: [...new Set([query, ...state.pastQueries])]
      .filter(Boolean)
      .slice(0, 10),
  })),
  on(usePastQuery, (state, { query }) => ({
    ...state,
    result: state.cache[query],
    query,
  }))
);

export const searchFeature = createFeature({
  name: 'search',
  reducer: searchReducer,
});

export const { selectQuery, selectResult, selectPastQueries, selectCache } =
  searchFeature;
