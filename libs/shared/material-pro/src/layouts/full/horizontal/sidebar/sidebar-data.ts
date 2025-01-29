import { NavItem } from '../../vertical/sidebar/nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboards',
    iconName: 'home',
    route: 'dashboards',
    children: [],
  },
  {
    displayName: 'Apps',
    iconName: 'apps',
    route: 'apps',
    ddType: '',
    children: [],
  },
  {
    displayName: 'Ui',
    iconName: 'components',
    route: 'ui-components',
    ddType: 'two-column',
    children: [],
  },
  {
    displayName: 'Pages',
    iconName: 'clipboard',
    route: 'theme-pages',
    ddType: '',
    children: [],
  },
];
