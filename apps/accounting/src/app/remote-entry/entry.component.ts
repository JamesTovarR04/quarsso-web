import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  imports: [CommonModule, NxWelcomeComponent],
  selector: 'qss-accounting-accounting-entry',
  template: `<qss-accounting-nx-welcome></qss-accounting-nx-welcome>`,
})
export class RemoteEntryComponent {}
