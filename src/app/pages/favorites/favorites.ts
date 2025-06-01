import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesService } from 'src/app/services/favorites.service';
import { RouterLink } from '@angular/router';
import { FavoriteCharacterComponent } from "../../components/favorite-character/favorite-character";
import { Character } from 'src/app/types/characters.interface';

@Component({
  selector: 'rc-favorites',
  imports: [CommonModule, RouterLink, FavoriteCharacterComponent],
  templateUrl: './favorites.html',
  styleUrl: './favorites.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesComponent implements OnInit {
  favorites = signal<Character[]>([]);

  favoritesService = inject(FavoritesService);
  
  ngOnInit(): void {
      this.favorites.set(this.favoritesService.getFavorites());      
  }

  handleRemoveFavorite(id: number): void {
    this.favoritesService.removeFromFavorite(id);
    this.favorites.set(this.favoritesService.getFavorites()); 
  }
}
