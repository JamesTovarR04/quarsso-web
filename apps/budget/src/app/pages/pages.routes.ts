import { Route } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';

export const remoteRoutes: Route[] = [
  { path: '', title: 'Start', component: NxWelcomeComponent },
];
