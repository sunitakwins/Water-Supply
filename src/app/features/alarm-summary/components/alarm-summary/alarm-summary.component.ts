import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ExportToCsv } from 'export-to-csv-file';
import { SnotifyService } from 'ng-snotify';
import { CookieService } from 'ngx-cookie-service';
import { EventService } from 'src/app/core/services';
import { AlarmSummaryService } from '../../services/alarm-summary.service';

@Component({
  selector: 'app-alarm-summary',
  templateUrl: './alarm-summary.component.html',
  styleUrls: ['./alarm-summary.component.scss']
})
export class AlarmSummaryComponent implements OnInit {

  // @ViewChild('selectedDate', {static: false}) filterDate: ElementRef;

  selectedDate : Date = new Date('');
  sensorName: string = '';
  alertDataList: any = [];

  displayedColumns: string[] = ['Date And Time', 'Point Name', 'Data Name', 'Status'];

  constructor(
    private tranlateService: TranslateService,
    private eventService: EventService, 
    private alarmSummary: AlarmSummaryService
  ) { }

  ngOnInit() {
    this.eventService.sensorIdDetails.subscribe(res => {
      this.sensorName = res.sensorname; this.getAlertListData(res.mainSensorid);
    })
  }

  getAlertListData(id: string) {
    this.alarmSummary.getAlertByMainSensorId(id).subscribe(res => {
      this.alertDataList = res.alertResponses;
      this.eventService.alertSummaryData.next(this.alertDataList);
    })
  }


  resetFilters(){
    this.selectedDate = new Date('');
  }
  // TO DO in this component
     // ****filter array data by date
  filterDataByDate(){
    debugger
  }  
}
