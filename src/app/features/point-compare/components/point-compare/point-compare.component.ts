import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { DropdownCategoryName } from 'src/app/core/enums';
import { EventService } from 'src/app/core/services';
import { PointCompareService } from '../../services/point-compare.service';

@Component({
  selector: 'app-point-compare',
  templateUrl: './point-compare.component.html',
  styleUrls: ['./point-compare.component.scss']
})
export class PointCompareComponent implements OnInit {

  PropertyLayoutRequest: DropdownCategoryName = DropdownCategoryName.SensorPropertyValue;
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
  

   filterDataByDate(date : Date){
  
   }

  selectedLayout(propertyValueName: string){
    this.selectedPropertyValue = propertyValueName;
 }


  getGraphData(){
      
  }


  get currentLanguage(){
    return this.eventService.currentLanguage.subscribe(lang => {
       
    })
  }

}
