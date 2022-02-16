import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/core/services';
import { PointDetailService } from './../../services/point-detail.service';
import { Subscription } from 'rxjs';
import { WaterFlowRequestModel } from 'src/app/core/models';

@Component({
  selector: 'app-point-detail',
  templateUrl: './point-detail.component.html',
  styleUrls: ['./point-detail.component.scss']
})
export class PointDetailComponent implements OnInit{
  sensorId: string = '';
  sensorName: string = '';

  // need to change
  widgetsData : any[] = [
    { name: 'Water Quantity', value: 12 , unit: 'gpm' },
    { name: 'Water Level',  value: 12 , unit: 'm' },
    { name: 'Freshwater Electrical Conductivity',  value: 12 , unit: 'μS/cm' },
    { name: 'Seawater Electrical Conductivity', value: 12 , unit: 'ms/cm' },
    { name: 'Water Temperature',  value: 12 , unit: '°C' },
    { name: 'Turbidity',  value: 12 , unit: 'degree' },
    { name: 'Battery Voltage',  value: 12 ,unit: 'V'},
  ];

  datesData : any = [];
  graphListData : any = []; 

  sensorDataSub!: Subscription;
  datesSub!: Subscription;

  constructor(
    private pointDetailService : PointDetailService,
    private eventService: EventService) { 
    }

  ngOnInit() {
    this.sensorDataSub = this.eventService.sensorIdDetails.subscribe(sensorData => {
      this.sensorName = sensorData.sensorname; this.sensorId = sensorData.mainSensorid;
    });

   this.datesSub = this.eventService.selectedDateDetails.subscribe(dates => {
      this.datesData = dates;
      this.getGraphAndListData();
    });
  }


  getGraphAndListData() {
    this.pointDetailService.waterFlowDataBySensorIdDates(this.datesData).subscribe((res: any) => {
        this.graphListData  = res.waterFlowResponse;
    });
  }
 

  tabChanged(value: any) {
     
   }


  ngOnDestroy() {
    this.sensorDataSub.unsubscribe();
    this.datesSub.unsubscribe();
  }

}
