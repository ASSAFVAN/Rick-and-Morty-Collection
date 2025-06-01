import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character } from 'src/app/types/characters.interface';

@Component({
  selector: 'rc-favorite-character',
  imports: [CommonModule],
  templateUrl: './favorite-character.html',
  styleUrl: './favorite-character.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteCharacterComponent {
  character = input<Character | null>();
  removeFavorite = output<boolean>();

  onFavoriteCharacterClick(removeFavorite: any): void {
    this.removeFavorite.emit(removeFavorite);
  }
}
