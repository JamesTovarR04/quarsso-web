import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Modules',
  },
  {
    displayName: 'Budget',
    iconName: 'calendar-dollar',
    route: 'budget',
  },
  {
    displayName: 'Accounting',
    iconName: 'businessplan',
    route: 'accounting',
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
