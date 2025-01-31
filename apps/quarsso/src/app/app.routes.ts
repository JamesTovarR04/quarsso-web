import { NxWelcomeComponent } from './nx-welcome.component';
import { Route } from '@angular/router';
import { FullComponent } from '@quarsso/material-pro/layouts/full/full.component';
import { BlankComponent } from '@quarsso/material-pro/layouts/blank/blank.component';
import { MsalGuard } from '@azure/msal-angular';

export const appRoutes: Route[] = [
  {
    path: '',
    component: FullComponent,
    canActivate: [MsalGuard],
    children: [
      {
        path: '',
        redirectTo: '/starter',
        pathMatch: 'full',
      },
      {
        path: 'starter',
        title: 'Starter',
        component: NxWelcomeComponent,
      },
      {
        path: 'accounting',
        title: 'Accounting',
        canActivate: [MsalGuard],
        loadChildren: () =>
          import('accounting/Routes').then((m) => m.remoteRoutes),
      },
      {
        path: 'budget',
        title: 'Budget',
        canActivate: [MsalGuard],
        loadChildren: () =>
          import('budget/Routes').then((m) => m.remoteRoutes),
      },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [],
  },
  {
    path: '**',
    redirectTo: 'authentication/error',
  },
];
