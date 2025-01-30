import { Route } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { ReportsComponent } from './reports/reports.component';

export const remoteRoutes: Route[] = [
  { path: '', title: 'Start', component: NxWelcomeComponent },
  { path: 'reports', title: 'Reports', component: ReportsComponent },
];
