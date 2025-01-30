import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Modules',
  },
  {
    displayName: 'Budget',
    iconName: 'calendar-dollar',
    route: '',
    children: [
      {
        displayName: 'Dashboard',
        iconName: 'dashboard',
        route: 'budget',
      },
      {
        displayName: 'Reports',
        iconName: 'report',
        route: 'budget/reports',
      },
    ],
  },
  {
    displayName: 'Accounting',
    iconName: 'businessplan',
    route: '',
    children: [
      {
        displayName: 'Dashboard',
        iconName: 'dashboard',
        route: 'accounting',
      },
      {
        displayName: 'Reports',
        iconName: 'report',
        route: 'accounting/reports',
      },
      {
        displayName: 'Parameters',
        iconName: 'adjustments-horizontal',
        route: 'accounting/parameters',
      },
    ],
  },
  {
    navCap: 'External',
  },
  {
    displayName: 'Quarsso',
    iconName: 'star',
    route: 'https://quarsso.com/',
    external: true,
  },
];
