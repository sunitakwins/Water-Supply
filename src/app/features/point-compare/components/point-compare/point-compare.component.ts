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

  constructor(
    private pointCompareService: PointCompareService, 
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.propertyValuesData = this.pointCompareService.propertyValues;
    
    this.eventService.sensorIdDetails.subscribe(res => {
      this.sensorName = res.sensorname; this.sensorId = res.mainSensorid;
    });
  
    // console.log('SSSS', this.currentLanguage);
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
