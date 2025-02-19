import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {
  selectQuery,
  selectResult,
} from '../../main-page/store/search.reducer';
import { User } from '../../types/user.interface';
import { CommonModule } from '@angular/common';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ui-result-list',
  imports: [CommonModule, ScrollingModule],
  standalone: true,
  styleUrl: './result-list.component.scss',
  template: `
    @let searchResult = searchResults(); @if(query()){ @if(searchResult.length){
    <cdk-virtual-scroll-viewport class="viewport" itemSize="20">
      <div class="viewport__item" *cdkVirtualFor="let result of searchResult">
        <b>Name</b>: {{ result.name }}, <b>Age</b>: {{ result.age }}
      </div>
    </cdk-virtual-scroll-viewport>
    } @else {
    <div class="no-data">No Data Available</div>
    } }
  `,
})
export class ResultListComponent {
  private readonly store = inject(Store);
  protected readonly searchResults =
    this.store.selectSignal<User[]>(selectResult);
  protected readonly query = this.store.selectSignal<string>(selectQuery);
}
