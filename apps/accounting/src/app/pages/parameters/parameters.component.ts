import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@quarsso/material-pro/material.module';

@Component({
  imports: [ MaterialModule, RouterModule ],
  selector: 'parameters',
  template: `<mat-card  appearance="outlined">
    <mat-card-header>
      <mat-card-title>Accounting Parameters</mat-card-title>
    </mat-card-header>
    <mat-card-content>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. In totam consectetur porro iste sunt corporis non sequi ab? Laborum cumque accusantium accusamus culpa libero dolores amet odit quisquam expedita quas.</p>
      <a mat-flat-button routerLink="general">General Parameters</a>
    </mat-card-content>
  </mat-card>`
})
export class ParametersComponent {
}