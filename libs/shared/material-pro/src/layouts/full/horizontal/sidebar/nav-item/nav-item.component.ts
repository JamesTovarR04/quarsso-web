import {
  Component,
  Input,
} from '@angular/core';
import { Router } from '@angular/router';
import { NavService } from '../../../../../services/nav.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TablerIconComponent } from 'angular-tabler-icons';
import { NavItem } from '../../../vertical/sidebar/nav-item/nav-item';

@Component({
    selector: 'shared-horizontal-nav-item',
    imports: [TablerIconComponent, CommonModule, MatIconModule],
    templateUrl: './nav-item.component.html'
})
export class AppHorizontalNavItemComponent {
  @Input() depth?: number;
  @Input() item: NavItem;

  constructor(public navService: NavService, public router: Router) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  onItemSelected(item: NavItem) {
    if (!item.children || !item.children.length) {
      this.router.navigate([item.route]);
    }
  }
}
