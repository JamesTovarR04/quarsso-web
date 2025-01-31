import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CoreService } from '@quarsso/material-pro/services/core.service';
import { AppSettings } from '@quarsso/material-pro/config';
import { MaterialModule } from '@quarsso/material-pro/material.module';

@Component({
  selector: 'mt-pro-shared-blank',
  templateUrl: './blank.component.html',
  styleUrls: [],
  imports: [RouterOutlet, MaterialModule, CommonModule],
})
export class BlankComponent {
  private htmlElement: HTMLHtmlElement;

  options: AppSettings;

  constructor(private settings: CoreService) {
    this.options = this.settings.getOptions();
    this.htmlElement = document.querySelector('html') ?? new HTMLHtmlElement();
    // Initialize project theme with options
    this.receiveOptions(this.options);
  }

  receiveOptions(options: AppSettings): void {
    this.toggleDarkTheme(options);
    this.toggleColorsTheme(options);
  }

  toggleDarkTheme(options: AppSettings) {
    if (options.theme === 'dark') {
      this.htmlElement.classList.add('dark-theme');
      this.htmlElement.classList.remove('light-theme');
    } else {
      this.htmlElement.classList.remove('dark-theme');
      this.htmlElement.classList.add('light-theme');
    }
  }

  toggleColorsTheme(options: AppSettings) {
    // Remove any existing theme class dynamically
    this.htmlElement.classList.forEach((className) => {
      if (className.endsWith('_theme')) {
        this.htmlElement.classList.remove(className);
      }
    });

    // Add the selected theme class
    this.htmlElement.classList.add(options.activeTheme);
  }
}
