import { NavItem } from "@quarsso/material-pro/layouts/full/vertical/sidebar/nav-item/nav-item";

export const navItems: NavItem[] = [
  {
    navCap: 'Accounting',
  },
  {
    displayName: 'Dashboard',
    iconName: 'dashboard',
    route: '',
  },
  {
    displayName: 'Reports',
    iconName: 'report',
    route: 'reports',
  },
  {
    displayName: 'Parameters',
    iconName: 'adjustments-horizontal',
    route: 'parameters',
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
