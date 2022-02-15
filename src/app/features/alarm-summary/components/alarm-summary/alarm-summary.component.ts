import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  Subscription } from 'rxjs';
import { AlarmSummaryResponseModel } from 'src/app/core/models';
import {  EventService } from 'src/app/core/services';
import { AlarmSummaryService } from '../../services/alarm-summary.service';

@Component({
  selector: 'app-alarm-summary',
  templateUrl: './alarm-summary.component.html',
  styleUrls: ['./alarm-summary.component.scss']
})
export class AlarmSummaryComponent implements OnInit {

  selectedDate : Date = new Date('');
  sensorName: string = '';
  sensorId: string = "";
  alertDataList: AlarmSummaryResponseModel[] = [];

  sensorDetailsSub!: Subscription;

  displayedColumns: string[] = ['Date And Time', 'Point Name', 'Data Name', 'Status'];

  constructor(
    private eventService: EventService, 
    private alarmSummary: AlarmSummaryService,
    private datePipe : DatePipe,
  ) { }

  ngOnInit() {
    this.sensorDetailsSub = this.eventService.sensorIdDetails.subscribe(res => {
      this.sensorName = res.sensorname; this.sensorId = res.mainSensorid;
      this.getAlertListData(res.mainSensorid);
    })
  }

  getAlertListData(id: string) {
    this.alarmSummary.getAlertByMainSensorId(id).subscribe((res :any) => {
      this.alertDataList = res.alertResponses;
      this.sendFilterData(this.alertDataList);
    })
  }

  resetFilters(){
    this.selectedDate = new Date('');
    this.getAlertListData(this.sensorId);
  }

  filterDataByDate(date : Date){
    let data ={
      mainSensorId : this.sensorId, selectedDate : this.datePipe.transform(date, 'YYYY-MM-dd')
    }
    this.alarmSummary.getAlertByMainSensorIdDate(data).subscribe(res =>{
      this.alertDataList = res.alertResponses;
      this.sendFilterData(this.alertDataList);
    })
  }  

  sendFilterData(data : any[]){
    this.eventService.alertSummaryData.next(data);
  }

  ngOnDestroy() {
    this.sensorDetailsSub.unsubscribe();
  }

}
