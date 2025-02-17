import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from '@quarsso/material-pro/material.module';
import { TablerIconComponent } from 'angular-tabler-icons';

@Component({
  selector: 'mt-pro-shared-sidebar',
  imports: [TablerIconComponent, MaterialModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  @Input() showToggle = true;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();
}
