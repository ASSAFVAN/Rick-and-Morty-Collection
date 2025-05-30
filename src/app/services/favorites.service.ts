import { Injectable, inject } from '@angular/core';
import { Character } from '../types/characters.interface';
import { LocalStorageService } from './local-storage.service';

const FAVORITES_KEY = 'favoriteCharacters';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  localstorageService = inject(LocalStorageService);

  getFavorites(): Character[] {
    return this.localstorageService.getAll(FAVORITES_KEY);
  }

  isFavorite(id: number): boolean {
    return this.getFavorites().some((f) => f.id === id);
  }

  toggleFavorite(character: Character): void {
    const favorites = this.getFavorites();
    const index = favorites.findIndex((f) => f.id === character.id);

    if (index > -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(character);
    }

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }

  removeFromFavorite(id: number): void {
    this.localstorageService.delete(FAVORITES_KEY, id);
  }
}
