import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/core/services';
import { PointDetailService } from './../../services/point-detail.service';
import { WaterFlowRequestModel } from 'src/app/core/models/reports/reports.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-point-detail',
  templateUrl: './point-detail.component.html',
  styleUrls: ['./point-detail.component.scss']
})
export class PointDetailComponent implements OnInit{
  sensorId: string = '';
  sensorName: string = '';

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
    this.pointDetailService.waterFlowDataBySensorIdDates(this.datesData).subscribe(res => {
        this.graphListData  = res;
    });
  }
 

  tabChanged(value: any) {
     
   }


  ngOnDestroy() {
    this.sensorDataSub.unsubscribe();
    this.datesSub.unsubscribe();
  }

}
