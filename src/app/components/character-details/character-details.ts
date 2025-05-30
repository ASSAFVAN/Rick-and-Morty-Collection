import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { CharactersService } from 'src/app/services/characters.service';
import { Character } from 'src/app/types/characters.interface';

@Component({
  selector: 'app-character-details',
  imports: [CommonModule],
  templateUrl: './character-details.html',
  styleUrl: './character-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterDetailsComponent implements OnInit{
  data = inject(DIALOG_DATA);
  additionalCharacterData: Character | undefined = undefined;
  charactersService = inject(CharactersService);

  ngOnInit(): void {
      this.additionalCharacterData = this.charactersService.getCharacters().find((character) => character.id === this.data?.id)
  }
}
