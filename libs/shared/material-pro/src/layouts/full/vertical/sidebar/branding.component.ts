import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppSettings } from '@quarsso/material-pro/config';
import { CoreService } from '@quarsso/material-pro/services/core.service';

@Component({
  selector: 'mt-pro-shared-branding',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="branding d-none d-lg-flex align-items-center">
      <a [routerLink]="['/']" class="d-flex">
        <img
          src="./assets/images/logos/light-logo.svg"
          class="align-middle m-2"
          alt="logo"
        />
      </a>
    </div>
  `,
})
export class BrandingComponent {
  options: AppSettings;

  constructor(private settings: CoreService) {
    this.options = this.settings.getOptions();
  }
}
