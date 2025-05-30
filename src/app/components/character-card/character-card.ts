import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character } from 'src/app/types/characters.interface';
import { Dialog } from '@angular/cdk/dialog';
import { CharacterDetailsComponent } from '../character-details/character-details';
import { FavoritesService } from 'src/app/services/favorites.service';
import { CharactersService } from 'src/app/services/characters.service';
import { AddEditCharacterComponent } from '../add-edit-character/add-edit-character';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-character-card',
  imports: [CommonModule],
  templateUrl: './character-card.html',
  styleUrl: './character-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterCardComponent {
  character = input<Character | null>();
  deleteCharacter = output<Character>();

  deletedCharacter$ = new Subject<Character>()
  
  dialog = inject(Dialog);
  favoritesService = inject(FavoritesService);
  characterService = inject(CharactersService);
  
  openDetailsModal(): void {    
    this.dialog.open(CharacterDetailsComponent, {
      data: this.character(),
      width: '350px',
    });
  }

  isFavorite(): boolean {
    const character = this.character();
    return character ? this.favoritesService.isFavorite(character.id) : false;
  }

  isEditable(): boolean {
    const character = this.character();
    return character ? this.characterService.isEditable(character.id) : false;
  }

  editCharacter(): void {
    this.dialog.open(AddEditCharacterComponent, {
      data: this.character(),
      width: '350px',
    })
  }

  onDeleteCharacter(character: Character): void {
    this.deletedCharacter$.next(character);
    this.deleteCharacter.emit(character);
  }

  toggleFavorite(event: MouseEvent): void {    
    event.stopPropagation();
    const character = this.character();
    if (!character) return
    this.favoritesService.toggleFavorite(character);
  }
}
