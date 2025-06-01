import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataService } from './services/data-service.service';
import { Character } from './types/characters.interface';

@Component({
  imports: [RouterModule],
  selector: 'rc-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  dataService = inject(DataService);
  characters: Character[] = [];

}
