import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input() lineChartColors: Color[] = [];
  @Input() lineChartLabels: Label[] = [];
  @Input() lineChartData: ChartDataSets[] = [];
  @Input() yAxisValueName : string[] =[];
  

  public lineChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: this.translateService.instant('pointDetail.timeStamp')
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: this.translateService.instant('pointDetail.value')
        }
      }]
    }
  };

  lineChartLegend = true;
  lineChartType = 'line';
  lineChartPlugins = [];


  // @Input() chartData: LineChartData;
  // @Input() colorCode: string = '#365ff3';

  // chart: any;

  // public lineChartData: ChartDataSets[] = [
    // { data: [61, 59, 80, 65, 45, 55, 40, 56, 76, 65, 77, 60], label: 'Apple' },
    // { data: [57, 50, 75, 87, 43, 46, 37, 48, 67, 56, 70, 50], label: 'Mi' },
  // ];

  // public lineChartLabels: Label[] = [];
  // ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // public lineChartOptions = {
  //   responsive: true,
  // };

  constructor(private translateService: TranslateService) {
    // Chart.register(zoomPlugin);
    // Chart.register(...registerables);
  }

  ngOnInit() { }

  ngAfterViewInit() {
    // this.lineChartData = [{
    //   data: this.chartData.data,
    //   pointBackgroundColor: this.colorCode,
    //   pointRadius: 2,
    //   pointHoverRadius: 2
    // }];

    // if(!this.hasChartData){
    //   this.lineChartLabels = this.chartData.labels;

    //   const pointsCount = this.lineChartLabels.length;

    //   let firstLabel = '';
    //   let minX = null, maxX = null, minY = null, maxY = null;

    //   if (pointsCount > 0) {
    //     firstLabel = this.lineChartLabels[0].toString();

    //     minX = this.lineChartLabels[0];
    //     maxX = this.lineChartLabels[pointsCount - 1];

    //     minY = Math.min(...this.chartData.data);
    //     maxY = Math.max(...this.chartData.data);
    //   }

    //   let tickOptions = {};
    //   if (firstLabel.length > 2) {
    //     tickOptions = {
    //       autoSkip: true,
    //       minRotation: 30,
    //       font: {
    //         size: this.isMobile ? 9 : 12
    //       }
    //     };
    //   }

    //   this.chart = new Chart(this.chartRef.nativeElement, {
    //     type: 'line',
    //     data: {
    //       labels: this.lineChartLabels, // your labels array
    //       datasets: this.lineChartData
    //     },
    //     options: {
    //       responsive: true,
    //       maintainAspectRatio: false,
    //       layout: {
    //         padding: 5
    //       },
    //       scales: {
    //         x: {
    //           ticks: tickOptions,
    //           offset: true,
    //           grid: {
    //             display: false,
    //             drawOnChartArea: false
    //           }
    //         },
    //         y: {
    //           beginAtZero: true,
    //           ticks: {
    //             autoSkip: true,
    //             maxTicksLimit: 12,
    //             padding: 5,
    //             font: {
    //               size: this.isMobile ? 9 : 12
    //             }
    //           },
    //           grid: {
    //             display: true,
    //             drawBorder: false
    //           },
    //           title: {
    //             display: true,
    //             text: this.translateService.instant('home.energyConsumption') +' '+ '(kWh)',
    //             font: {
    //               family: 'Roboto', // Your font family
    //               size: (this.isMobile && !this.isJapaneseLanguage) ? 7.5 : (this.isMobile && this.isJapaneseLanguage) ? 7.5 : 12
    //             },
    //           }
    //         },
    //       },
    //       plugins: {
    //         legend: {
    //           display: false,
    //         },
    //         zoom: {
    //           pan: {
    //             enabled: true,
    //             mode: 'x',
    //           },
    //           zoom: {
    //             wheel: {
    //               enabled: true,
    //             },
    //             pinch: {
    //               enabled: true
    //             },
    //             mode: 'x',
    //           },
    //           limits: {
    //             y: {
    //               min: 0
    //             }
    //           }
    //         }
    //       }
    //     }
    //   });
    // }
  }

  ngOnDestroy() {

  }

  get isJapaneseLanguage() {
    return this.translateService.currentLang == 'jp';
  }

  get hasChartData() {
    return this.lineChartData?.length == 0;
  }

  // get isMobile() {
  //   return this.utilityService.isMobileDevice();
  // }


}
