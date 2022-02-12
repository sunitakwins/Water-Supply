import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';
import { TranslateService } from '@ngx-translate/core';
import { ExportToCsv } from 'export-to-csv-file';
import { SnotifyService } from 'ng-snotify';
import { CookieService } from 'ngx-cookie-service';
import { interval } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';
import { AuthService, EventService, LoaderService } from 'src/app/core/services';
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
  alertDataList: any = [];

  displayedColumns: string[] = ['Date And Time', 'Point Name', 'Data Name', 'Status'];

  constructor(
    private eventService: EventService, 
    // private authService : AuthService,
    private alarmSummary: AlarmSummaryService,
    private datePipe : DatePipe,
    private loaderService : LoaderService
  ) {

   }

  ngOnInit() {
    // this.authService.getselectedDatelang();
    this.eventService.sensorIdDetails.subscribe(res => {
      this.sensorName = res.sensorname; this.sensorId = res.mainSensorid;
      this.getAlertListData(res.mainSensorid);
    })
  }

  getAlertListData(id: string) {
    this.loaderService.showSpinner();
    this.alarmSummary.getAlertByMainSensorId(id).subscribe((res :any) => {
      this.alertDataList = res.alertResponses;
      this.sendFilterData(this.alertDataList);
      this.loaderService.hideSpinner();
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

}
