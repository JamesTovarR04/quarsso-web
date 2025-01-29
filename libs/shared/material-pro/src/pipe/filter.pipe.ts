import { Pipe, PipeTransform } from '@angular/core';
import { NavItem } from '../layouts/full/vertical/sidebar/nav-item/nav-item';

@Pipe({ name: 'appFilter' })
export class FilterPipe implements PipeTransform {
  
  transform(items: NavItem[], searchText: string): NavItem[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter((it) => {
      return it.displayName?.toLocaleLowerCase().includes(searchText);
    });
  }
}
