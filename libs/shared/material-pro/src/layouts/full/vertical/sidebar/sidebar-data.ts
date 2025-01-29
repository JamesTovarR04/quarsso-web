import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Personal',
  },
  {
    displayName: 'External Link',
    iconName: 'star',
    route: 'https://www.google.com/',
    external: true,
  },
];
