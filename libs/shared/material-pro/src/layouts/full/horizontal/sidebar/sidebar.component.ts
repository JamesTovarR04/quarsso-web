import {
  Component,
  ChangeDetectorRef,
} from '@angular/core';
import { navItems } from './sidebar-data';
import { Router } from '@angular/router';
import { NavService } from '../../../../services/nav.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { AppHorizontalNavItemComponent } from './nav-item/nav-item.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'shared-horizontal-sidebar',
    imports: [AppHorizontalNavItemComponent, CommonModule],
    templateUrl: './sidebar.component.html'
})
export class AppHorizontalSidebarComponent {
  navItems = navItems;
  parentActive = '';

  mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;

  constructor(
    public navService: NavService,
    public router: Router,
    media: MediaMatcher,
    changeDetectorRef: ChangeDetectorRef
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 1100px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
    this.router.events.subscribe(
      () => (this.parentActive = this.router.url.split('/')[1])
    );
  }
}
