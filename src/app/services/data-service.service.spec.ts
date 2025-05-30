import { TestBed } from '@angular/core/testing';
import { DataService } from './data-service.service';
import { HttpClient } from '@angular/common/http';
import { CharacterResponse } from '../types/characters.interface';
import { of, throwError } from 'rxjs';

describe('DataService', () => {
  let service: DataService;
  let httpClientMock: { get: jest.Mock };

  beforeEach(() => {
    httpClientMock = {
      get: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        DataService,
        { provide: HttpClient, useValue: httpClientMock }
      ]
    });

    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch characters', () => {
    const mockResponse: CharacterResponse = {
      results: [],
      info: { count: 0, pages: 0, next: null, prev: null }
    };

    httpClientMock.get.mockReturnValue(of(mockResponse));

    service.getCharacters().subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    expect(httpClientMock.get).toHaveBeenCalledWith('https://rickandmortyapi.com/api//character');
  });

  it('should fetch next characters with given URL', () => {
    const mockResponse: CharacterResponse = {
      results: [],
      info: { count: 0, pages: 0, next: null, prev: null }
    };

    const nextUrl = 'https://rickandmortyapi.com/api/character?page=2';
    httpClientMock.get.mockReturnValue(of(mockResponse));

    service.getNextCharacters(nextUrl).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    expect(httpClientMock.get).toHaveBeenCalledWith(nextUrl);
  });

  it('should fetch characters by field and return results', () => {
    const mockCharacters = [{ id: 1, name: 'Rick' }];
    const response = { results: mockCharacters };

    httpClientMock.get.mockReturnValue(of(response));

    service.getCharactersByField('name', 'Rick').subscribe(res => {
      expect(res).toEqual(mockCharacters);
    });

    expect(httpClientMock.get).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api//character',
      expect.objectContaining({
        params: expect.anything()
      })
    );
  });

  it('should return empty array on error in getCharactersByField', () => {
    httpClientMock.get.mockReturnValue(throwError(() => new Error('API Error')));

    service.getCharactersByField('name', 'Rick').subscribe(res => {
      expect(res).toEqual([]);
    });
  });
});
