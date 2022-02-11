import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { EventService } from 'src/app/core/services';
import { PointCompareService } from '../../services/point-compare.service';

@Component({
  selector: 'app-point-compare',
  templateUrl: './point-compare.component.html',
  styleUrls: ['./point-compare.component.scss']
})
export class PointCompareComponent implements OnInit {
  selectedDate: Date = new Date();
  selectedPropertyValue: string = '';
  propertyValuesData: string[] = [];
  sensorName: string = '';
  sensorId: string = '';
  chartData : any[] = [];

  // ================================================================
  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions : (ChartOptions) = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  // ====================================================================
  constructor(
    private pointCompareService: PointCompareService, 
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.propertyValuesData = this.pointCompareService.propertyValues;
    
    this.eventService.sensorIdDetails.subscribe(res => {
      this.sensorName = res.sensorname; this.sensorId = res.mainSensorid;
    });
  
    console.log('SSSS', this.currentLanguage);
  }

  onChange(date: Date) { }

  onSelectingProperty(value: string) { }

  getGraphData(){
      
  }


  get currentLanguage(){
    return this.eventService.currentLanguage.subscribe(lang => {
       
    })
  }

}
