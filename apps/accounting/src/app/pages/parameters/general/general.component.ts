import { Component } from '@angular/core';
import { MaterialModule } from '@quarsso/material-pro/material.module';

@Component({
  standalone: true,
  imports: [ MaterialModule ],
  selector: 'general-page',
  template: `<mat-card  appearance="outlined">
    <mat-card-header>
      <mat-card-title>General Account Parameters</mat-card-title>
    </mat-card-header>
    <mat-card-content>Lorem ipsum dolor sit amet consectetur adipisicing elit. In totam consectetur porro iste sunt corporis non sequi ab? Laborum cumque accusantium accusamus culpa libero dolores amet odit quisquam expedita quas.</mat-card-content>
  </mat-card>`
})

export class GeneralPageComponent{
}