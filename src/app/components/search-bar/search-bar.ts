import { ChangeDetectionStrategy, Component, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent implements OnInit{
  search = output<string>();

  searchCtrl = new FormControl('');

  ngOnInit(): void {
    this.searchCtrl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
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
