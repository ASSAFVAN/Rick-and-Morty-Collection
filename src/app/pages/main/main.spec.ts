import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MainComponent } from './main';
import { DataService } from 'src/app/services/data-service.service';
import { CharactersService } from 'src/app/services/characters.service';
import { Dialog } from '@angular/cdk/dialog';
import { of } from 'rxjs';
import { Character } from 'src/app/types/characters.interface';
import { AddEditCharacterComponent } from 'src/app/components/add-edit-character/add-edit-character';
import { ActivatedRoute } from '@angular/router';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  const mockCharacters: Character[] = [
    {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth' },
      location: { name: 'Earth' },
      image: ''
    },
    {
      id: 2,
      name: 'Morty Smith',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth' },
      location: { name: 'Earth' },
      image: ''
    }
  ];

  const mockResponse = {
    results: mockCharacters,
    info: { next: 'next-page-url' }
  };

  const mockDataService = {
    getCharacters: jest.fn().mockReturnValue(of(mockResponse)),
    getCharactersByField: jest.fn().mockReturnValue(of(mockCharacters)),
    getNextCharacters: jest.fn().mockReturnValue(of(mockResponse))
  };

  const mockCharactersService = {
    isEditable: jest.fn().mockReturnValue(true),
    getCharacters: jest.fn().mockReturnValue(mockCharacters)
  };

  const mockDialog = {
    open: jest.fn()
  };

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: jest.fn(),
      },
      queryParamMap: {
        get: jest.fn(),
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainComponent],
      providers: [
        { provide: DataService, useValue: mockDataService },
        { provide: CharactersService, useValue: mockCharactersService },
        { provide: Dialog, useValue: mockDialog },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load initial characters on ngOnInit', () => {
    component.ngOnInit();
    expect(mockDataService.getCharacters).toHaveBeenCalled();
    expect(component.characters()).toEqual([...mockCharacters, ...mockCharacters]);
    expect(component.nextPageUrl).toBe('next-page-url');
  });

  it('should handle search query and update characters', fakeAsync(() => {
    component.ngOnInit();
    component.handleSearchQuery('Rick');
    tick(300);
    expect(mockDataService.getCharactersByField).toHaveBeenCalledTimes(3);
    expect(component.characters()).toEqual(mockCharacters);
  }));

  it('should handle infinite scroll and append characters', () => {
    component.characters.set([...mockCharacters]);  
    component.nextPageUrl = 'next-page-url';
    component.isLoading = false;
  
    component.handleInfinteScroll();
  
    expect(mockDataService.getNextCharacters).toHaveBeenCalledWith('next-page-url');
    expect(component.characters()).toEqual([...mockCharacters, ...mockCharacters]);
    expect(component.isLoading).toBe(false);
  });

  it('should open dialog to add character', () => {
    component.addCharacter();
    expect(mockDialog.open).toHaveBeenCalledWith(AddEditCharacterComponent, { width: '350px' });
  });
});
