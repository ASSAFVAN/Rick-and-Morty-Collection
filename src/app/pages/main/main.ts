import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersListComponent } from "../../components/characters-list/characters-list";
import { Character } from 'src/app/types/characters.interface';
import { BehaviorSubject, Observable, catchError, debounceTime, distinctUntilChanged, forkJoin, map, of, startWith, switchMap, tap } from 'rxjs';
import { DataService } from 'src/app/services/data-service.service';
import { SearchBarComponent } from "../../components/search-bar/search-bar";
import { Dialog } from '@angular/cdk/dialog';
import { AddEditCharacterComponent } from 'src/app/components/add-edit-character/add-edit-character';
import { CharactersService } from 'src/app/services/characters.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'rc-main',
  imports: [CommonModule, CharactersListComponent, SearchBarComponent, RouterLink],
  templateUrl: './main.html',
  styleUrl: './main.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit{
  characters = signal<Character[]>([]);  
  cachedCharacters$ = new BehaviorSubject<Character[]>([]); 
  searchTerm$ = new BehaviorSubject<string>('');

  nextPageUrl: string | null = null;
  isLoading = false;

  dataService = inject(DataService);
  charactersService = inject(CharactersService);
  dialog = inject(Dialog);

  ngOnInit(): void {
    this.loadInitCharacters();
    this.triggerListeners();
  }

  loadInitCharacters(): void {
    this.dataService.getCharacters().subscribe((res) => {
      this.cachedCharacters$.next([...res.results, ...this.charactersService.getCharacters()]);
      this.characters.set([...res.results, ...this.charactersService.getCharacters()]);
      this.nextPageUrl = res.info.next; 
    })
  }

  triggerListeners(): void {
    this.searchTerm$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query: string) => {
        if (!query) return this.cachedCharacters$;
        return forkJoin([
          this.dataService.getCharactersByField('name', query),
          this.dataService.getCharactersByField('species', query),
          this.dataService.getCharactersByField('type', query),
        ]).pipe(
          map(([byName, bySpecies, byType]) => {
            const all = [...byName, ...bySpecies, ...byType];
            const unique = new Map<number, Character>();
            all.forEach(char => unique.set(char.id, char));
            return Array.from(unique.values());
          }),
          catchError(() => of([]))
        );
      }),
      tap(res => {        
        this.characters.set(res);
      })
    ).subscribe();
  }

  handleSearchQuery(query: string): void {
    this.searchTerm$.next(query);
  }

  handleInfinteScroll(): void {
    if (this.isLoading) return;
    this.isLoading = true;
    if (this.nextPageUrl) {
      this.dataService.getNextCharacters(this.nextPageUrl).subscribe((res)=> {
        this.characters.set([...this.characters(), ...res.results])
        this.nextPageUrl = res.info.next || '';
        this.isLoading = false;
      })
    }
    this.isLoading = false;
  }

  addCharacter(): void {
    this.dialog.open(AddEditCharacterComponent, {
      width: '350px',
    });
  }
}
