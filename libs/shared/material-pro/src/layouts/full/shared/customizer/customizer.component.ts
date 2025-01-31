import {
  Component,
  Output,
  EventEmitter,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MaterialModule } from '@quarsso/material-pro/material.module';
import { AppSettings } from '@quarsso/material-pro/config';
import { CoreService } from '@quarsso/material-pro/services/core.service';
import { TablerIconComponent } from 'angular-tabler-icons';

@Component({
    selector: 'mt-pro-shared-customizer',
    imports: [
        TablerIconComponent,
        MaterialModule,
        FormsModule,
        NgScrollbarModule,
    ],
    templateUrl: './customizer.component.html',
    encapsulation: ViewEncapsulation.None
})
export class CustomizerComponent {

  options: AppSettings;

  @Output() optionsChange = new EventEmitter<AppSettings>();
  hideSingleSelectionIndicator = signal(true);

  constructor(private settings: CoreService) {
    this.options = this.settings.getOptions();
  }

  setDark() {
    this.settings.setOptions({ theme: 'dark' });
    this.emitOptions();
  }

  setColor(color: string) {
    this.settings.setOptions({ activeTheme: color });
    this.emitOptions();
  }

  setDir(dir: 'ltr' | 'rtl') {
    this.settings.setOptions({ dir: dir });
    this.emitOptions();
  }

  setSidebar(sidenavOpened: boolean) {
    this.settings.setOptions({ sidenavOpened: sidenavOpened });
    this.emitOptions();
  }

  private emitOptions() {
    this.optionsChange.emit(this.options);
  }
}

