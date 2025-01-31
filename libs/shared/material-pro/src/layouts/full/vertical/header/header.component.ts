import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
  Inject,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { navItems } from '../sidebar/sidebar-data';
import { TranslateService } from '@ngx-translate/core';
import { TablerIconComponent } from 'angular-tabler-icons';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { BrandingComponent } from '../sidebar/branding.component';
import { MaterialModule } from '@quarsso/material-pro/material.module';
import { AppSettings } from '@quarsso/material-pro/config';
import { CoreService } from '@quarsso/material-pro/services/core.service';
import { Language } from '@quarsso/material-pro/model/language';
import {
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
  MsalService,
  MsalBroadcastService,
} from '@azure/msal-angular';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import {
  AuthenticationResult,
  BrowserUtils,
  EventMessage,
  EventType,
  InteractionStatus,
} from '@azure/msal-browser';
import { filter } from 'rxjs';

interface Notifications {
  id: number;
  icon: string;
  color: string;
  title: string;
  time: string;
  subtitle: string;
}

interface Inbox {
  id: number;
  bgcolor: string;
  imagePath: string;
  title: string;
  time: string;
  subtitle: string;
}

interface Profiledd {
  id: number;
  title: string;
  link: string;
  new?: boolean;
}

interface Apps {
  id: number;
  icon: string;
  color: string;
  title: string;
  subtitle: string;
  link: string;
}

interface Quicklinks {
  id: number;
  title: string;
  link: string;
}

type DetailType = {
  givenName?: string;
  displayName?: string;
  jobTitle?: string;
  mail?: string;
  photo?: string;
};

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

@Component({
  selector: 'mt-pro-shared-header',
  imports: [
    RouterModule,
    CommonModule,
    NgScrollbarModule,
    TablerIconComponent,
    MaterialModule,
    BrandingComponent,
  ],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  isCollapse: boolean = false; // Initially hidden

  toggleCollpase() {
    this.isCollapse = !this.isCollapse; // Toggle visibility
  }

  showFiller = false;

  public selectedLanguage: Language = {
    language: 'Español',
    code: 'es',
    icon: '/assets/images/flag/icon-flag-es-co.svg',
  };

  public languages: Language[] = [
    {
      language: 'Español',
      code: 'es',
      icon: '/assets/images/flag/icon-flag-es-co.svg',
    },
    {
      language: 'English',
      code: 'en',
      type: 'US',
      icon: '/assets/images/flag/icon-flag-en.svg',
    },
  ];

  @Output() optionsChange = new EventEmitter<AppSettings>();

  options: AppSettings;

  isIframe = false;
  loginDisplay = false;
  status: boolean = false;
  profile: DetailType = {
    givenName: '',
    photo: '/assets/images/profile/profile.png',
    mail: '',
  };

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private location: Location,
    private http: HttpClient,
    private settings: CoreService,
    private vsidenav: CoreService,
    public dialog: MatDialog,
    private translate: TranslateService
  ) {
    this.options = this.settings.getOptions();
    translate.setDefaultLang(this.options.language);
  }

  ngOnInit(): void {
    this.authService.handleRedirectObservable().subscribe();
    this.authService.instance.enableAccountStorageEvents();
    const currentPath = this.location.path();
    this.isIframe =
      BrowserUtils.isInIframe() &&
      !window.opener &&
      currentPath.indexOf('logout') < 0;
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS)
      )
      .subscribe((result: EventMessage) => {
        const payload = <AuthenticationResult>result.payload;
        this.authService.instance.setActiveAccount(payload.account);
      });

    this.msalBroadcastService.msalSubject$
      .pipe(
        filter(
          (msg: EventMessage) =>
            msg.eventType === EventType.ACCOUNT_ADDED ||
            msg.eventType === EventType.ACCOUNT_REMOVED
        )
      )
      .subscribe(() => {
        if (this.authService.instance.getAllAccounts().length === 0) {
          window.location.pathname = '/';
        } else {
          this.setLoginDisplay();
        }
      });

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None)
      )
      .subscribe(() => {
        this.setLoginDisplay();
        this.checkAndSetActiveAccount();
      });
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
    this.status = this.loginDisplay;
    if (this.status) {
      if (typeof window !== 'undefined') {
        this.getProfile();
      }
    }
  }

  checkAndSetActiveAccount() {
    /**
     * If no active account set but there are accounts signed in, sets first account to active account
     * To use active account set here, subscribe to inProgress$ first in your component
     * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
     */
    const activeAccount = this.authService.instance.getActiveAccount();

    if (
      !activeAccount &&
      this.authService.instance.getAllAccounts().length > 0
    ) {
      const accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);
    }
  }

  getProfile() {
    this.http.get(GRAPH_ENDPOINT).subscribe((profile) => {
      this.profile = profile;
      this.profile.photo = '/assets/images/profile/user-1.jpg';
      this.getPhoto();
    });
  }

  getPhoto() {
    this.http
      .get(`${GRAPH_ENDPOINT}/photo/$value`, {
        responseType: 'blob',
      })
      .subscribe((photoBlob) => {
        this.profile.photo = URL.createObjectURL(photoBlob);
      });
  }

  logout(popup?: boolean) {
    if (popup) {
      this.authService.logoutPopup({
        mainWindowRedirectUri: '/',
      });
    } else {
      this.authService.logoutRedirect();
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(AppSearchDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  changeLanguage(lang: Language): void {
    this.translate.use(lang.code);
    this.selectedLanguage = lang;
  }

  setlightDark(theme: string) {
    this.options.theme = theme;
    this.emitOptions();
  }

  private emitOptions() {
    this.optionsChange.emit(this.options);
  }

  notifications: Notifications[] = [
    {
      id: 1,
      icon: 'layout-grid',
      color: 'primary',
      time: '8:30 AM',
      title: 'Launch Admin',
      subtitle: 'Just see the my new admin!',
    },
    {
      id: 2,
      icon: 'calendar',
      color: 'secondary',
      time: '8:21 AM',
      title: 'Event today',
      subtitle: 'Just a reminder that you have event',
    },
    {
      id: 3,
      icon: 'settings',
      color: 'warning',
      time: '8:05 AM',
      title: 'Settings',
      subtitle: 'You can customize this template',
    },
    {
      id: 4,
      icon: 'circles-relation',
      color: 'success',
      time: '7:30 AM',
      title: 'Launch Templates',
      subtitle: 'Just see the my new admin!',
    },
    {
      id: 5,
      icon: 'list-check',
      color: 'error',
      time: '7:03 AM',
      title: 'Event tomorrow',
      subtitle: 'Just a reminder that you have event',
    },
  ];

  inbox: Inbox[] = [
    {
      id: 1,
      bgcolor: 'bg-success',
      imagePath: 'assets/images/profile/user-6.jpg',
      time: 'just now',
      title: 'Michell Flintoff',
      subtitle: 'You: Yesterdy was great...',
    },
    {
      id: 2,
      bgcolor: 'bg-success',
      imagePath: 'assets/images/profile/user-2.jpg',
      time: '5 mins ago',
      title: 'Bianca Anderson',
      subtitle: 'Nice looking dress you...',
    },
    {
      id: 3,
      bgcolor: 'bg-success',
      imagePath: 'assets/images/profile/user-3.jpg',
      time: '10 mins ago',
      title: 'Andrew Johnson',
      subtitle: 'Sent a photo',
    },
    {
      id: 4,
      bgcolor: 'bg-success',
      imagePath: 'assets/images/profile/user-4.jpg',
      time: 'days ago',
      title: 'Marry Strokes',
      subtitle: 'If I don’t like something',
    },
    {
      id: 5,
      bgcolor: 'bg-success',
      imagePath: 'assets/images/profile/user-5.jpg',
      time: 'year ago',
      title: 'Josh Anderson',
      subtitle: '$230 deducted from account',
    },
  ];

  profiledd: Profiledd[] = [
    {
      id: 1,
      title: 'My Profile',
      link: '/',
    },
    {
      id: 2,
      title: 'My Projects',
      link: '/',
    },
    {
      id: 3,
      title: 'Inbox',
      new: true,
      link: '/',
    },
    {
      id: 4,
      title: ' Mode',
      link: '/',
    },
    {
      id: 5,
      title: ' Account Settings',
      link: '/',
    },
    // {
    //   id: 6,
    //   title: 'Sign Out',
    //   link: '/authentication/login',
    // },
  ];

  apps: Apps[] = [
    {
      id: 1,
      icon: 'message',
      color: 'primary',
      title: 'Chat Application',
      subtitle: 'Messages & Emails',
      link: '/accounting',
    },
    {
      id: 2,
      icon: 'list-check',
      color: 'secondary',
      title: 'Todo App',
      subtitle: 'Completed task',
      link: '/budget',
    },
    {
      id: 3,
      icon: 'file-invoice',
      color: 'success',
      title: 'Invoice App',
      subtitle: 'Get latest invoice',
      link: '/',
    },
    {
      id: 4,
      icon: 'calendar',
      color: 'error',
      title: 'Calendar App',
      subtitle: 'Get Dates',
      link: '/',
    },
    {
      id: 5,
      icon: 'device-mobile',
      color: 'warning',
      title: 'Contact Application',
      subtitle: '2 Unsaved Contacts',
      link: '/',
    },
    {
      id: 6,
      icon: 'ticket',
      color: 'primary',
      title: 'Tickets App',
      subtitle: 'Create new ticket',
      link: '/',
    },
    {
      id: 7,
      icon: 'mail',
      color: 'secondary',
      title: 'Email App',
      subtitle: 'Get new emails',
      link: '/',
    },
    {
      id: 8,
      icon: 'book-2',
      color: 'warning',
      title: 'Courses',
      subtitle: 'Create new course',
      link: '/',
    },
  ];
  quicklinks: Quicklinks[] = [
    {
      id: 1,
      title: 'Pricing Page',
      link: '/',
    },
    {
      id: 2,
      title: 'Authentication Design',
      link: '/',
    },
    {
      id: 3,
      title: 'Register Now',
      link: '/authentication/register',
    },
    {
      id: 4,
      title: '404 Error Page',
      link: '/authentication/error',
    },
    {
      id: 5,
      title: 'Notes App',
      link: '/',
    },
    {
      id: 6,
      title: 'Employee App',
      link: '/',
    },
    {
      id: 7,
      title: 'Todo Application',
      link: '/',
    },
  ];
}

@Component({
  selector: 'mt-pro-shared-search-dialog',
  imports: [RouterModule, MaterialModule, TablerIconComponent, FormsModule],
  templateUrl: 'search-dialog.component.html',
})
export class AppSearchDialogComponent {
  searchText: string = '';
  navItems = navItems;

  navItemsData = navItems.filter((navitem) => navitem.displayName);
}
