import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'qss-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'quarsso';
}
