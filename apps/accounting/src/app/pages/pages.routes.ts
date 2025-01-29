import { Route } from '@angular/router';
import { PagesComponent } from './pages.component';
import { ReportsComponent } from './reports/reports.component';

export const remoteRoutes: Route[] = [
  { path: '', title: 'Start', component: PagesComponent },
  { path: 'reports', title: 'Reports', component: ReportsComponent },
  { 
    path: 'parameters',
    title: 'Parameters',
    loadChildren: () => import('./parameters/parameters.routes').then((m) => m.parametersRoutes),
  },
];
