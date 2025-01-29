import { Component } from '@angular/core';
import { MaterialModule } from '@quarsso/material-pro/material.module';

@Component({
  imports: [ MaterialModule ],
  selector: 'reports',
  template: `<mat-card  appearance="outlined">
    <mat-card-header>
      <mat-card-title>Accounting Reports</mat-card-title>
    </mat-card-header>
    <mat-card-content>Lorem ipsum dolor sit amet consectetur adipisicing elit. In totam consectetur porro iste sunt corporis non sequi ab? Laborum cumque accusantium accusamus culpa libero dolores amet odit quisquam expedita quas.</mat-card-content>
  </mat-card>`
})
export class ReportsComponent {
}