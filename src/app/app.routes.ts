import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('../app/pages/main/main').then((c) => c.MainComponent),
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('../app/pages/favorites/favorites').then(
        (c) => c.FavoritesComponent
      ),
  },
];
