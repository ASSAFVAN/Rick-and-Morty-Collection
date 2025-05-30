import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Character, CharacterResponse } from '../types/characters.interface';
import { CharactersService } from './characters.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseApi = 'https://rickandmortyapi.com/api/';
  
  http = inject(HttpClient);
  charactersService = inject(CharactersService);

  getCharacters(): Observable<CharacterResponse> {
      return this.http.get<CharacterResponse>(`${this.baseApi}/character`);
  }

  getNextCharacters(url: string): Observable<CharacterResponse>{
      return this.http.get<CharacterResponse>(url);
  }

  getCharactersByField(field: 'name' | 'species' | 'type', query: string): Observable<Character[]> {
    const params = new HttpParams().set(field, query);
    const additionalCharacters = this.charactersService.getCharacters().filter(char =>
      char[field]?.toLowerCase().includes(query.toLowerCase())
    );
    return this.http.get<any>(`${this.baseApi}/character`, { params }).pipe(
      map(res => res.results || []),
      catchError(() => of([])),
      map(apiCharacters => {
        const combined = [...apiCharacters, ...additionalCharacters];
        const uniqueCharacters = new Map(combined.map(c => [c.id, c]));
        return Array.from(uniqueCharacters.values());
      })
    );
  }
}