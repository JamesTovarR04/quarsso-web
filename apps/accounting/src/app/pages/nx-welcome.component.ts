import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'qss-accounting-nx-welcome',
  imports: [CommonModule],
  template: `
    <!--
     * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     This is a starter component and can be deleted.
     * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     Delete this file and get started with your project!
     * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     -->
    <style>
      .shadow {
        box-shadow: 0 0 #0000, 0 0 #0000, 0 10px 15px -3px rgba(0, 0, 0, 0.1),
          0 4px 6px -2px rgba(0, 0, 0, 0.05);
      }
      .rounded {
        border-radius: 1.5rem;
      }
      .wrapper {
        width: 100%;
      }
      .container {
        margin-left: auto;
        margin-right: auto;
        max-width: 768px;
        padding-bottom: 3rem;
        padding-left: 1rem;
        padding-right: 1rem;
        color: rgba(55, 65, 81, 1);
        width: 100%;
      }
      #welcome {
        margin-top: 2.5rem;
      }
      #welcome h1 {
        font-size: 3rem;
        font-weight: 500;
        letter-spacing: -0.025em;
        line-height: 1;
      }
      #welcome span {
        display: block;
        font-size: 1.875rem;
        font-weight: 300;
        line-height: 2.25rem;
        margin-bottom: 0.5rem;
      }
    </style>
    <div class="wrapper">
      <div class="container">
        <!--  WELCOME  -->
        <div id="welcome">
          <h1>
            <span> Hello there, </span>
            Welcome accounting 👋
          </h1>
        </div>
      </div>
    </div>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcomeComponent {}
