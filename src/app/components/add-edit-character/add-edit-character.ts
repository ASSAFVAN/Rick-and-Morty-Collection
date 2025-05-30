import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CharacterGender, CharacterStatus } from 'src/app/types/character.enum';
import { DialogRef } from '@angular/cdk/dialog';
import { CharactersService } from 'src/app/services/characters.service';
import { Character } from 'src/app/types/characters.interface';

@Component({
  selector: 'app-add-character',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-edit-character.html',
  styleUrl: './add-edit-character.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditCharacterComponent implements OnInit{
  characterForm!: FormGroup;

  statusOptions = Object.values(CharacterStatus);
  genderOptions = Object.values(CharacterGender);
  currentId = 1000;
  submitLabel = 'Submit';

  fb = inject(FormBuilder);
  charactersService = inject(CharactersService);
  dialogRef = inject(DialogRef<AddEditCharacterComponent>);

  ngOnInit(): void {
    const data: Character = this.dialogRef.config.data;
    if (data?.id) {
      this.submitLabel = 'Update';
    }
    this.initializeForm(data);
  }

  private initializeForm(data: Character): void {
    const charactersData = this.charactersService.getCharacters();
    const updatedData = charactersData?.find((character) => character.id === data?.id);

    this.characterForm = this.fb.group({
      name: [updatedData?.name || '', Validators.required],
      status: [updatedData?.status || '', Validators.required],
      species: [updatedData?.species || '', Validators.required],
      type: [updatedData?.type || '', Validators.required],
      origin: [updatedData?.origin?.name || '', Validators.required],
      gender: [updatedData?.gender || '', Validators.required],
      image: [
        updatedData?.image || '',
        [Validators.required, Validators.pattern('(https?://.*\\.(?:png|jpg|jpeg|gif))')],
      ],
      location: [updatedData?.location?.name || '', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.characterForm.invalid) {
      return;
    }
    const { origin, location } = this.characterForm.value;
      const payload = {
        ...this.characterForm.value,
        id: this.currentId++,
        origin: {
          name: origin,
        },
        location: {
          name: location,
        },
      };      
    this.charactersService.addOrUpdateCharacter(payload);
    this.dialogRef.close(payload);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
