import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { SnotifyService } from 'ng-snotify';
import { DataTypeValue } from 'src/app/core/enums';
import { WaterFlowRequestModel } from 'src/app/core/models/reports/reports.model';
import { EventService } from 'src/app/core/services';
import { ReportsService } from '../../services/reports.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  selectedFromDate: Date = new Date('');
  selectedToDate: Date = new Date('');
  selectedValue: string = '';
  sensorName: string = '';
  sensorId: string = '';
  FormValueArray: string[] = [];
  sensorIdArray: string[] = [];


  constructor( 
    private reportService: ReportsService, private eventService: EventService, 
    private datePipe : DatePipe) { }

  ngOnInit() {
    this.FormValueArray = this.reportService.formValueArray;
    this.eventService.sensorIdDetails.subscribe(res => {
      this.sensorName = res.sensorname; this.sensorId = res.mainSensorid;
      // this.sensorIdArray.push(res.mainSensorid);
      // console.log('aa', this.sensorIdArray);
    })
  }

  onSubmit() {

    if (!(this.selectedFromDate && this.selectedToDate)) return;

    const dateTimeData: WaterFlowRequestModel = {
      mainSensorId: this.sensorId,
      fromDate : this.datePipe.transform(this.selectedFromDate,'yyyy-MM-dd h:mm:ss a') || '',
      toDate : this.datePipe.transform(this.selectedToDate,'yyyy-MM-dd h:mm:ss a') || '',
    };
  
    this.reportService.waterFlowDataBySensorIdDates(dateTimeData).subscribe(res => {
      let data = res.waterFlowResponse;
      this.eventService.alertSummaryData.next(data);
      // To DO ========
      if (this.selectedValue = DataTypeValue.ConvertedValue) {
        // 
      }
    });

  }

  sendFilterData(data : any[]){
    this.eventService.alertSummaryData.next(data);
  }

}
