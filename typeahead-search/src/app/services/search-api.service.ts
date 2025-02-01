import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../types/user.interface';
import { Store } from '@ngrx/store';
import { selectCahedKeys } from '../main-page/store/search.selectors';

@Injectable({ providedIn: 'root' })
export class SearchApiService {
  private readonly httpClient = inject(HttpClient);
  private readonly store = inject(Store);
  private readonly cacheMap = this.store.selectSignal(selectCahedKeys);
  getSearchList(query: string): Observable<User[]> {
    if (this.cacheMap().has(query)) {
      return of(this.cacheMap().get(query) as User[]);
    } else {
      return this.httpClient.get<User[]>('/api/fake-data', {
        params: {
          query,
        },
      });
    }
  }
}
