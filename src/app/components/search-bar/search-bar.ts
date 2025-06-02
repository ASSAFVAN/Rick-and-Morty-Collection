import { ChangeDetectionStrategy, Component, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { getTakeUntilDestroyed } from 'src/app/utils/utils';

@Component({
  selector: 'rc-search-bar',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent implements OnInit{
  search = output<string>();

  searchCtrl = new FormControl('');
  takeUntilDestroyed = getTakeUntilDestroyed();

  ngOnInit(): void {
    this.searchCtrl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      this.takeUntilDestroyed(),
    ).subscribe(value => {
      if (value !== null) {        
        this.searchQuery(value.trim());
      }
    })
  }

  searchQuery(query: string): void {
    this.search.emit(query);
  }
}
