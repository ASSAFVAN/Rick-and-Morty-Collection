import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterCardComponent } from './character-card';
import { Dialog } from '@angular/cdk/dialog';
import { FavoritesService } from 'src/app/services/favorites.service';
import { CharactersService } from 'src/app/services/characters.service';
import { Character } from 'src/app/types/characters.interface';

const mockCharacter: Character = {
  id: 1,
  name: 'Rick',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'Earth' },
  location: { name: 'Earth' },
  image: 'https://example.com/rick.png'
};

describe('CharacterCardComponent (Jest)', () => {
  let component: CharacterCardComponent;
  let fixture: ComponentFixture<CharacterCardComponent>;
  let dialog: Dialog;
  let favoritesService: FavoritesService;
  let charactersService: CharactersService;

  const mockDialog = { open: jest.fn() };
  const mockFavoritesService = {
    isFavorite: jest.fn(),
    toggleFavorite: jest.fn(),
  };
  const mockCharactersService = {
    isEditable: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterCardComponent],
      providers: [
        { provide: Dialog, useValue: mockDialog },
        { provide: FavoritesService, useValue: mockFavoritesService },
        { provide: CharactersService, useValue: mockCharactersService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterCardComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('character', mockCharacter);

    dialog = TestBed.inject(Dialog);
    favoritesService = TestBed.inject(FavoritesService);
    charactersService = TestBed.inject(CharactersService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open details modal', () => {
    component.openDetailsModal();
    expect(dialog.open).toHaveBeenCalledWith(expect.any(Function), {
      data: mockCharacter,
      width: '350px',
    });
  });

  it('should return true if character is favorite', () => {
    mockFavoritesService.isFavorite.mockReturnValue(true);
    expect(component.isFavorite()).toBe(true);
    expect(mockFavoritesService.isFavorite).toHaveBeenCalledWith(1);
  });

  it('should return false if character is not favorite', () => {
    mockFavoritesService.isFavorite.mockReturnValue(false);
    expect(component.isFavorite()).toBe(false);
  });

  it('should return true if character is editable', () => {
    mockCharactersService.isEditable.mockReturnValue(true);
    expect(component.isEditable()).toBe(true);
    expect(mockCharactersService.isEditable).toHaveBeenCalledWith(1);
  });

  it('should open edit character dialog', () => {
    component.editCharacter();
    expect(dialog.open).toHaveBeenCalledWith(expect.any(Function), {
      data: mockCharacter,
      width: '350px',
    });
  });

  it('should emit deleteCharacter and push to deletedCharacter$ when deleting', (done) => {
    component.deleteCharacter.subscribe((char) => {
      expect(char).toEqual(mockCharacter);
      done();
    });

    component.deletedCharacter$.subscribe((char) => {
      expect(char).toEqual(mockCharacter);
    });

    component.onDeleteCharacter(mockCharacter);
  });

  it('should toggle favorite and stop propagation', () => {
    const event = new MouseEvent('click');
    jest.spyOn(event, 'stopPropagation');

    component.toggleFavorite(event);

    expect(event.stopPropagation).toHaveBeenCalled();
    expect(mockFavoritesService.toggleFavorite).toHaveBeenCalledWith(mockCharacter);
  });

  it('should do nothing in toggleFavorite if character is null', () => {
    fixture.componentRef.setInput('character', null);
    const event = {
      stopPropagation: jest.fn()
    } as unknown as MouseEvent;    
    jest.spyOn(event, 'stopPropagation');

    component.toggleFavorite(event);

    expect(event.stopPropagation).toHaveBeenCalled();
    expect(mockFavoritesService.toggleFavorite).not.toHaveBeenCalled();
  });
});
