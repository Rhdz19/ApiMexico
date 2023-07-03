import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'explore-container',
    loadComponent: () => import('./explore-container/explore-container.page').then( m => m.ExploreContainerPage)
  },
];
