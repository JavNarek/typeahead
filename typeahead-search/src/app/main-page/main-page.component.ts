import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchComponent } from '../components/search/search.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SearchComponent],
  standalone: true,
  styleUrl: './main-page.component.scss',
  template: ` <ui-search /> `,
})
export default class MainPageComponent {}
