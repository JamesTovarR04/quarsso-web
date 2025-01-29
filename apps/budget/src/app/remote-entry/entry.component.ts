import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  imports: [CommonModule, NxWelcomeComponent],
  selector: 'qss-budget-budget-entry',
  template: `<qss-budget-nx-welcome></qss-budget-nx-welcome>`,
})
export class RemoteEntryComponent {}
