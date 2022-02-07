import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { SnotifyService } from 'ng-snotify';
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
  FormValueArray: string[] = [];
  sensorIdArray : string[] = [];

  constructor(private reportService: ReportsService, private snotifyService: SnotifyService, private translate: TranslateService, private eventService: EventService) { }

  ngOnInit() {
    this.FormValueArray = this.reportService.formValueArray;
    debugger
    this.eventService.sensorIdDetails.subscribe(res => {
      this.sensorName = res.sensorname;
      this.sensorIdArray.push(res.mainSensorid);
      console.log('aa', this.sensorIdArray);
    })
  }

  onSubmit() {

    // if(!this.selectedFromDate){ 
    //   this.snotifyService.error(this.translate.instant('Enter From Date & Time'), '');
    //   return;
    // }
    // if(!this.selectedToDate){
    //   this.snotifyService.error(this.translate.instant('Enter To Date & Time'), '');
    //   return;
    // }
    // if(this.selectedFromDate > this.selectedToDate){
    //   this.snotifyService.error(this.translate.instant('To Date should be greater than or equal to From Date'), '');
    //   return;
    // }

    // for (let y = 0; y < this.sensorIdArray.length; y++) {
    //   const dateTimeData = {
    //     mainSensorID: this.sensorIdArray[y].data.mainSensorid,
    //     fromDate: moment(this.selectedFromDate).format('YYYY/MM/DD hh:MM A'),
    //     toDate: moment(this.selectedToDate).format('YYYY/MM/DD hh:MM A')
    //   };
      // if ((fromDateTime && toDateTime) || !(fromDateTime && toDateTime)) {
      //   if (this.selectedValue === 'Converted' && ((fromDateTime && toDateTime))) {
      //     // this.todoService.getAllByMainSensorIdAndMultipleDates(dateTimeData).subscribe((response: any) => {

      //     //   for (let i = 0; i < response.waterFlowResponse.length; i++) {
      //     //     this.dataPropertiesArray.push(response.waterFlowResponse[i]);
      //     //   }
      //     //   // this.spinner.hide();
      //     // });
      //   }
      //   if (this.selectedValue === 'Raw' && ((fromDateTime && toDateTime))) {
      //     // this.todoService.getAllByMainSensorIdAndMultipleDates(dateTimeData).subscribe((response: any) => {
      //     //            for (let i = 0; i < response.waterFlowResponse.length; i++) {
      //     //     this.dataPropertiesArray.push(response.waterFlowResponse[i]);
      //     //   }
      //     //     // this.spinner.hide();
      //     // });
      //   }
      // }
    // }
  }

}
