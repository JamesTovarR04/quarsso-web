import { Route } from '@angular/router';
import { PagesComponent } from './pages.component';
import { ParametersComponent } from './parameters/parameters.component';
import { ReportsComponent } from './reports/reports.component';

export const remoteRoutes: Route[] = [
  { path: '', title: 'Start', component: PagesComponent },
  { path: 'parameters', title: 'Parameters', component: ParametersComponent },
  { path: 'reports', title: 'Reports', component: ReportsComponent },
];
