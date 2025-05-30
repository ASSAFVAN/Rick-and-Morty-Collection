import { ChangeDetectionStrategy, Component, OnInit, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character } from 'src/app/types/characters.interface';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data-service.service';
import { CharacterCardComponent } from "../character-card/character-card";
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { CharactersService } from 'src/app/services/characters.service';

@Component({
  selector: 'app-characters-list',
  imports: [CommonModule, CharacterCardComponent, InfiniteScrollDirective],
  templateUrl: './characters-list.html',
  styleUrl: './characters-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharactersListComponent {
  characters = input<Character[] | null>();
  scroll = output<string>();

  dataService = inject(DataService);
  charactersService = inject(CharactersService);
  
  onScroll(scroll: any): void {
    this.scroll.emit(scroll);
  }

  handleDeteleCharacter(character: Character): void {
    this.charactersService.deleteCharacter(character.id);
  }
}
