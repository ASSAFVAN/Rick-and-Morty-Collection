import { Injectable } from '@angular/core';
import { Character } from '../types/characters.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  getAll(key: string): Character[] {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  }

  save(key: string, item: Character): void {
    const items = this.getAll(key);
    const index = items.findIndex(i => i.id === item.id);

    if (index > -1) {
      items[index] = item;
    } else {
      items.push(item);
    }

    localStorage.setItem(key, JSON.stringify(items));
  }

  delete(key: string, id: number): void {
    const characters = this.getAll(key).filter(c => c.id !== id);
    localStorage.setItem(key, JSON.stringify(characters));
  }

}
