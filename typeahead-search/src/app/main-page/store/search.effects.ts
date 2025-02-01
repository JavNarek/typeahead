import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SearchApiService } from '../../services/search-api.service';
import {
  search,
  searchSuccess,
  searchFailure,
  addPastQuery,
} from './search.actions';
import { switchMap, catchError, of, mergeMap } from 'rxjs';

@Injectable()
export class SearchEffects {
  private readonly actions$ = inject(Actions);
  private readonly searchService = inject(SearchApiService);

  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(search),
      switchMap(({ query }) =>
        this.searchService.getSearchList(query).pipe(
          mergeMap((results) => {
            let actions = [
              searchSuccess({ query, results }),
              ...(results?.length ? [addPastQuery({ query })] : []),
            ];
            return [...actions];
          }),
          catchError((error) => of(searchFailure({ error })))
        )
      )
    )
  );
}
