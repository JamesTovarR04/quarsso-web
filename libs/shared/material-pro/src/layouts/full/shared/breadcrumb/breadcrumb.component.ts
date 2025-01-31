import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  Router,
  NavigationEnd,
  ActivatedRoute,
  Data,
  RouterModule,
} from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexYAxis,
  ApexGrid,
  ApexPlotOptions,
  ApexFill,
  ApexMarkers,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { CoreService } from '@quarsso/material-pro/services/core.service';
import { AppSettings } from '@quarsso/material-pro/config';

export interface BreadcrumbOption {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  grid: ApexGrid;
  marker: ApexMarkers;
  colors: string;
  axisBorder: {
    show: boolean;
  };
}

@Component({
  selector: 'mt-pro-shared-breadcrumb',
  imports: [NgApexchartsModule, RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: [],
})
export class AppBreadcrumbComponent {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);

  public breadcrumbOption!: Partial<BreadcrumbOption>;
  public breadcrumb2Option!: Partial<BreadcrumbOption>;

  // @Input() layout;
  pageInfo: Data = Object.create(null);

  options: AppSettings;

  constructor(
    private settings: CoreService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {
    this.options = this.settings.getOptions()
    this.breadcrumbOption = {
      series: [
        {
          name: '',
          data: [5, 8, 7, 12, 6, 7, 15, 20],
        },
      ],
      chart: {
        type: 'bar',
        width: 70,
        height: 40,
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: true,
        },
      },
      colors: 'var(--mat-sys-primary)',
      grid: {
        show: false,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 2,
          columnWidth: '50%',
          barHeight: '100%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 0,
        colors: ['transparent'],
      },
      xaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
      axisBorder: {
        show: false,
      },
      fill: {
        colors: ['var(--mat-sys-primary)'],
        opacity: 1,
      },
      tooltip: {
        theme: 'dark',
        style: {
          fontFamily: 'inherit',
        },
        x: {
          show: false,
        },
        y: {
          formatter: undefined,
        },
      },
    };

    this.breadcrumb2Option = {
      series: [
        {
          name: '',
          data: [5, 8, 7, 12, 6, 7, 15, 20],
        },
      ],
      chart: {
        type: 'bar',
        width: 70,
        height: 40,
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: true,
        },
      },
      colors: 'var(--mat-sys-secondary)',
      grid: {
        show: false,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 2,
          columnWidth: '50%',
          barHeight: '100%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 0,
        colors: ['transparent'],
      },
      xaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
      axisBorder: {
        show: false,
      },
      fill: {
        colors: ['var(--mat-sys-secondary)'],
        opacity: 1,
      },
      tooltip: {
        theme: 'dark',
        style: {
          fontFamily: 'inherit',
        },
        x: {
          show: false,
        },
        y: {
          formatter: undefined,
        },
      },
    };

    // for breadcrumb
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        })
      )
      .pipe(filter((route) => route.outlet === 'primary'))
      .pipe(mergeMap((route) => route.data))
      // tslint:disable-next-line - Disables all
      .subscribe((event) => {
        // tslint:disable-next-line - Disables all
        this.titleService.setTitle(event['title'] + ' - Quarsso');
        this.pageInfo = event;
      });
  }
}
