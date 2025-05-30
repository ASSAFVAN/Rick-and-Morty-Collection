import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditCharacterComponent } from './add-edit-character';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { CharactersService } from 'src/app/services/characters.service';
import { CharacterStatus, CharacterGender } from 'src/app/types/character.enum';
import { Character } from 'src/app/types/characters.interface';

describe('AddEditCharacterComponent', () => {
  let component: AddEditCharacterComponent;
  let fixture: ComponentFixture<AddEditCharacterComponent>;
  let charactersService: jest.Mocked<CharactersService>;
  let dialogRef: jest.Mocked<DialogRef<AddEditCharacterComponent>>;

  const mockCharacter: Character = {
    id: 1,
    name: 'Rick Sanchez',
    status: CharacterStatus.Alive,
    species: 'Human',
    type: '',
    gender: CharacterGender.Male,
    origin: { name: 'Earth' },
    location: { name: 'Earth' },
    image: 'https://example.com/rick.png',
  };

  beforeEach(async () => {
    charactersService = {
      getCharacters: jest.fn(),
      addOrUpdateCharacter: jest.fn(),
    } as unknown as jest.Mocked<CharactersService>;

    dialogRef = {
      config: { data: mockCharacter },
      close: jest.fn(),
    } as unknown as jest.Mocked<DialogRef<AddEditCharacterComponent>>;

    await TestBed.configureTestingModule({
      imports: [AddEditCharacterComponent, ReactiveFormsModule],
      providers: [
        { provide: CharactersService, useValue: charactersService },
        { provide: DialogRef, useValue: dialogRef },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set submitLabel to "Update" and initialize form with character data', () => {
      charactersService.getCharacters.mockReturnValue([mockCharacter]);

      component.ngOnInit();

      expect(component.submitLabel).toBe('Update');
      expect(component.characterForm.value.name).toBe('Rick Sanchez');
    });

    it('should initialize form with empty values if no matching character', () => {
      dialogRef.config.data = { id: 999 } as Character;
      charactersService.getCharacters.mockReturnValue([]);

      component.ngOnInit();

      expect(component.characterForm.value.name).toBe('');
    });
  });

  describe('onSubmit', () => {
    beforeEach(() => {
      charactersService.getCharacters.mockReturnValue([mockCharacter]);
      component.ngOnInit();
    });

    it('should call service and close dialog with correct payload', () => {
      component.characterForm.patchValue({
        name: 'Morty',
        status: CharacterStatus.Alive,
        species: 'Human',
        type: '',
        origin: 'Earth',
        gender: CharacterGender.Male,
        image: 'https://example.com/morty.jpg',
        location: 'Citadel',
      });

      component.onSubmit();

      expect(charactersService.addOrUpdateCharacter).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Morty',
          origin: { name: 'Earth' },
          location: { name: 'Citadel' },
        })
      );

      expect(dialogRef.close).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Morty',
        })
      );
    });

    it('should not call service or close dialog if form is invalid', () => {
      component.characterForm.patchValue({
        name: 'Morty',
        status: CharacterStatus.Alive,
        species: 'Human',
        type: '',
        origin: 'Earth',
        gender: CharacterGender.Male,
        image: 'ttttt',
        location: 'Citadel'
      });

      component.onSubmit();

      expect(charactersService.addOrUpdateCharacter).not.toHaveBeenCalled();
      expect(dialogRef.close).not.toHaveBeenCalled();
    });
  });

  it('should close dialog on cancel', () => {
    component.cancel();
    expect(dialogRef.close).toHaveBeenCalled();
  });
});
