import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreService } from '@quarsso/shared/services/core.service';

@Component({
  selector: 'shared-auth-branding',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="d-flex align-items-center">
      <a [routerLink]="['/']" class="logodark">
        <img
          src="./assets/images/logos/dark-logo.svg"
          class="align-middle m-2"
          alt="logo"
        />
      </a>

      <a [routerLink]="['/']" class="logolight">
        <img
          src="./assets/images/logos/light-logo.svg"
          class="align-middle m-2"
          alt="logo"
        />
      </a>
    </div>
  `,
})
export class AppAuthBrandingComponent {
  options = this.settings.getOptions();

  constructor(private settings: CoreService) {}
}
