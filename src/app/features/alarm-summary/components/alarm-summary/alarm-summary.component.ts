import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ExportToCsv } from 'export-to-csv-file';
import { SnotifyService } from 'ng-snotify';
import { CookieService } from 'ngx-cookie-service';
import { interval } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';
import { EventService, LoaderService } from 'src/app/core/services';
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
    private alarmSummary: AlarmSummaryService,
    private datePipe : DatePipe,
    private loaderService : LoaderService
  ) { }

  ngOnInit() {
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
    let selectedDate = this.datePipe.transform(date, 'YYYY-MM-dd');
    let data = this.alertDataList.filter((x:any) => x.shortDate === selectedDate);
    this.alertDataList = data;
    this.sendFilterData(this.alertDataList)
  }  

  sendFilterData(data : any[]){
    this.eventService.alertSummaryData.next(data);
  }


}
