import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { search } from '../../main-page/store/search.actions';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { selectQuery } from '../../main-page/store/search.reducer';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, ReactiveFormsModule],
  selector: 'ui-search',
  standalone: true,
  styleUrl: './search.component.scss',
  template: ` <input type="text" [formControl]="searchControl" /> `,
})
export class SearchComponent implements OnInit {
  private readonly store = inject(Store);
  protected readonly query$ = this.store.select<string>(selectQuery);
  protected searchControl = new FormControl<string>('');
  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((query) => {
        this.store.dispatch(search({ query: query ?? '' }));
      });
    this.query$.subscribe((query) =>
      this.searchControl.setValue(query, { emitEvent: false })
    );
  }
}
