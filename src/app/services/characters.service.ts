import { Injectable, inject } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Character } from '../types/characters.interface';

const CHARACTERS_KEY = 'additionalCharacters';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  
  localstorageService = inject(LocalStorageService);

  isEditable(id: number): boolean {
    return this.localstorageService.getAll(CHARACTERS_KEY).some((char) => char.id === id);
  }

  deleteCharacter(id: number): void {
    this.localstorageService.delete(CHARACTERS_KEY, id);
  }

  getCharacters(): Character[] {
    return this.localstorageService.getAll(CHARACTERS_KEY);
  }

  addOrUpdateCharacter(character: Character): void {
    this.localstorageService.save(CHARACTERS_KEY, character);
  }
}
