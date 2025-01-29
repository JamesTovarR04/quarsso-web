import {
  Component,
  Output,
  EventEmitter,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MaterialModule } from '@quarsso/shared/material.module';
import { AppSettings } from '@quarsso/shared/config';
import { CoreService } from '@quarsso/shared/services/core.service';
import { TablerIconComponent } from 'angular-tabler-icons';

@Component({
    selector: 'shared-customizer',
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

  options = this.settings.getOptions();



  @Output() optionsChange = new EventEmitter<AppSettings>();
  hideSingleSelectionIndicator = signal(true);

  constructor(private settings: CoreService) { }
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

