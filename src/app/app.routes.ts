import { Route } from '@angular/router';
import { MainComponent } from './pages/main/main';
import { FavoritesComponent } from './pages/favorites/favorites';

export const appRoutes: Route[] = [
    { path: '', component: MainComponent },
    { path: 'favorites', component: FavoritesComponent },
];
