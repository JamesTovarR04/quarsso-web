import { Route } from '@angular/router';
import { FullComponent } from '@quarsso/material-pro/layouts/full/full.component';
import { navItems } from './pages/sidebar-data';

export const appRoutes: Route[] = [
  {
    path: '',
    title: 'Budget',
    data: { menu: navItems },
    component: FullComponent,
    loadChildren: () =>
      import('./pages/pages.routes').then((m) => m.remoteRoutes),
  },
];
