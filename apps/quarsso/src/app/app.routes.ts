import { NxWelcomeComponent } from './nx-welcome.component';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'accounting',
    loadChildren: () =>
      import('accounting/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'budget',
    loadChildren: () => import('budget/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: '',
    component: NxWelcomeComponent,
  },
];
