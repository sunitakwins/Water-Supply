import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { SnotifyService } from 'ng-snotify';
import { DataTypeValue } from 'src/app/core/enums';
import { WaterFlowRequestModel } from 'src/app/core/models/reports/reports.model';
import { EventService } from 'src/app/core/services';
import { ReportsService } from '../../services/reports.service';

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

  dataPropertiesArray : any = [];

  constructor(private reportService: ReportsService, private snotifyService: SnotifyService, private translate: TranslateService, private eventService: EventService) { }

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

    if (this.selectedValue = DataTypeValue.ConvertedValue) {

    }

    const dateTimeData : WaterFlowRequestModel = {
      mainSensorId: this.sensorId,
      fromDate:this.selectedFromDate,
      toDate: this.selectedToDate
    };

    this.reportService.waterFlowDataBySensorIdDates(dateTimeData).subscribe(res => {
      for (let i = 0; i < res.waterFlowResponse.length; i++) {
        this.dataPropertiesArray.push(res.waterFlowResponse[i]);
      }
    });
  }

}
