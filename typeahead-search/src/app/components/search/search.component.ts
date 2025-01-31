import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, ReactiveFormsModule],
  selector: 'ui-search',
  standalone: true,
  styleUrl: './search.component.scss',
  template: ` <input type="text" [formControl]="searchControl" /> `,
})
export class SearchComponent implements OnInit {
  protected searchControl = new FormControl<string>('');
  ngOnInit(): void {
    this.searchControl.valueChanges.subscribe();
  }
}
