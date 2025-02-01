import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SearchComponent } from '../components/search/search.component';
import { ResultListComponent } from '../components/result-list/result-list.component';
import { Store } from '@ngrx/store';
import { selectPastQueries } from './store/search.reducer';
import { usePastQuery } from './store/search.actions';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SearchComponent, ResultListComponent],
  standalone: true,
  styleUrl: './main-page.component.scss',
  template: `
    <div class="search-wrapper"><ui-search /><ui-result-list /></div>
    <div class="chips-container">
      Past queries @for (item of pastQueries(); track item) {
      <div class="chip" (click)="usePastQuery(item)">{{ item }}</div>
      }
    </div>
  `,
})
export default class MainPageComponent {
  private readonly store = inject(Store);
  protected readonly pastQueries =
    this.store.selectSignal<string[]>(selectPastQueries);

  protected usePastQuery(item: string): void {
    this.store.dispatch(usePastQuery({ query: item }));
  }
}
