import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterDetailsComponent } from './character-details';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { CharactersService } from 'src/app/services/characters.service';
import { Character } from 'src/app/types/characters.interface';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CharacterDetailsComponent', () => {
  let component: CharacterDetailsComponent;
  let fixture: ComponentFixture<CharacterDetailsComponent>;

  const mockCharacters: Character[] = [
    { id: 1, name: 'Rick Sanchez', status: 'Alive', species: 'Human', type: '', gender: 'Male', origin: { name: 'Earth' }, location: { name: 'Earth' }, image: '' },
    { id: 2, name: 'Morty Smith', status: 'Alive', species: 'Human', type: '', gender: 'Male', origin: { name: 'Earth' }, location: { name: 'Earth' }, image: '' },
  ];

  const mockDialogData = {
    id: 123,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    origin: { name: 'Earth' },
    location: { name: 'Citadel' },
  };

  const mockCharactersService = {
    getCharacters: jest.fn().mockReturnValue([
      {
        id: 123,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        gender: 'Male',
        origin: { name: 'Earth' },
        location: { name: 'Citadel' },
      },
    ]),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterDetailsComponent],
      providers: [
        { provide: DIALOG_DATA, useValue: mockDialogData },
        { provide: CharactersService, useValue: mockCharactersService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set additionalCharacterData correctly on ngOnInit', () => {
    component.ngOnInit();

    expect(mockCharactersService.getCharacters).toHaveBeenCalled();

    expect(component.additionalCharacterData).toEqual(
      mockCharactersService.getCharacters()[0]
    );
  });
});
