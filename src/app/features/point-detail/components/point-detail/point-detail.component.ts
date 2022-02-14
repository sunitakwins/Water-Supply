import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/core/services';
import { PointDetailService } from './../../services/point-detail.service';
import { WaterFlowRequestModel } from 'src/app/core/models/reports/reports.model';

@Component({
  selector: 'app-point-detail',
  templateUrl: './point-detail.component.html',
  styleUrls: ['./point-detail.component.scss']
})
export class PointDetailComponent implements OnInit {
  sensorId: string = '';
  sensorName: string = '';
  selectedDates  : any =[]; 
  graphAndListData : any = [];

  constructor(private eventService: EventService, private pointDetailService: PointDetailService) { }

  ngOnInit(): void {
    this.eventService.sensorIdDetails.subscribe(sensorData => {
      this.sensorName = sensorData.sensorname;
      this.sensorId = sensorData.mainSensorid;
    });
    
    this.eventService.selectedDateDetails.subscribe(dates => {
      this.selectedDates =dates;
      this.getGraphAndListData();
    });

  }

  getGraphAndListData() {
    const requestData: WaterFlowRequestModel = {
      mainSensorId: this.sensorId,
      fromDate: this.selectedDates.fromDate,
      toDate: this.selectedDates.toDate
    }
    debugger
    this.pointDetailService.waterFlowDataBySensorIdDates(requestData).subscribe(res => {
        this.graphAndListData  = res;
    })
  }

  tabChanged(value: any) {

  }

}
