import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'budget-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  title = 'Accounting';
}
