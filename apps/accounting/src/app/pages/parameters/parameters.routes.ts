import { Route } from '@angular/router';
import { GeneralPageComponent } from './general/general.component';
import { ParametersComponent } from './parameters.component';

export const parametersRoutes: Route[] = [
  { 
    path: '',
    children: [
      {
        path: '',
        component: ParametersComponent
      },
      {
        path: 'general',
        component: GeneralPageComponent
      }
    ]
  },
];
